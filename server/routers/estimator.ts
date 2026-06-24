import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createEstimatorSubmission } from "../db";
import { invokeLLM } from "../_core/llm";
import { sendEstimatorEmail } from "../_core/email";
import type { Request } from "express";

const serviceTypeSchema = z.enum(["driveway", "deck", "siding", "vehicle", "patio", "walkway"]);
const photoUrlSchema = z.string().min(1);

function firstHeaderValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getRequestOrigin(req: Request) {
  const forwardedProto = firstHeaderValue(req.headers["x-forwarded-proto"]);
  const forwardedHost = firstHeaderValue(req.headers["x-forwarded-host"]);
  const protocol = forwardedProto?.split(",")[0]?.trim() || req.protocol || "https";
  const host = forwardedHost?.split(",")[0]?.trim() || req.headers.host;

  if (!host) {
    throw new Error("Could not resolve request host for uploaded photos");
  }

  return `${protocol}://${host}`;
}

function resolvePublicPhotoUrls(photoUrls: string[], req: Request) {
  const origin = getRequestOrigin(req);
  return photoUrls.map((url) => new URL(url, origin).toString());
}

// Pricing matrix for Mexico, MO area (per sq ft except vehicle flat rate)
const PRICING_MATRIX = {
  driveway: { min: 0.15, max: 0.35, avg: 0.25 },
  deck: { min: 0.20, max: 0.40, avg: 0.30 },
  siding: { min: 0.10, max: 0.25, avg: 0.18 },
  vehicle: { min: 50, max: 150, avg: 100 }, // flat rate
  patio: { min: 0.15, max: 0.35, avg: 0.25 },
  walkway: { min: 0.15, max: 0.30, avg: 0.22 },
};

export const estimatorRouter = router({
  analyzePhotos: publicProcedure
    .input(
      z.object({
        photoUrls: z.array(photoUrlSchema),
        serviceType: serviceTypeSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const publicPhotoUrls = resolvePublicPhotoUrls(input.photoUrls, ctx.req);

        // Use LLM to analyze photos and estimate square footage
        const analysisPrompt = `You are an expert exterior restoration estimator for G&S Exterior Restoration in Mexico, Missouri.

Analyze these photos of a ${input.serviceType} and provide:
1. Estimated square footage (be conservative)
2. Condition assessment (poor/fair/good/excellent)
3. Any special considerations (stains, damage, etc.)

Respond in JSON format:
{
  "estimatedSquareFeet": number,
  "condition": "poor" | "fair" | "good" | "excellent",
  "notes": "string"
}`;

        const response = await invokeLLM({
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: analysisPrompt,
                },
                ...publicPhotoUrls.map((url) => ({
                  type: "image_url" as const,
                  image_url: {
                    url,
                    detail: "high" as const,
                  },
                })),
              ],
            },
          ],
        });

        const messageContent = response.choices[0]?.message.content;
        const analysisText =
          typeof messageContent === "string"
            ? messageContent
            : messageContent?.find((part) => part.type === "text")?.text ?? "";

        // Parse the JSON response
        const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("Could not parse LLM response");
        }

        const analysis = JSON.parse(jsonMatch[0]);

        // Calculate estimate price based on square footage and condition
        const pricing = PRICING_MATRIX[input.serviceType];
        let pricePerUnit = pricing.avg;

        // Adjust price based on condition
        if (analysis.condition === "poor") {
          pricePerUnit *= 1.3; // 30% premium for difficult jobs
        } else if (analysis.condition === "fair") {
          pricePerUnit *= 1.1; // 10% premium
        } else if (analysis.condition === "excellent") {
          pricePerUnit *= 0.9; // 10% discount for easy jobs
        }

        // Calculate total (in cents for database storage)
        let estimatedPrice = 0;
        if (input.serviceType === "vehicle") {
          estimatedPrice = Math.round(pricePerUnit * 100);
        } else {
          estimatedPrice = Math.round(
            analysis.estimatedSquareFeet * pricePerUnit * 100
          );
        }

        return {
          estimatedSquareFeet: analysis.estimatedSquareFeet,
          estimatedPrice,
          condition: analysis.condition,
          notes: analysis.notes,
        };
      } catch (error) {
        console.error("Photo analysis error:", error);
        throw new Error("Failed to analyze photos");
      }
    }),

  submitEstimate: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10),
        propertyAddress: z.string().min(5),
        serviceType: serviceTypeSchema,
        estimatedSquareFeet: z.number().optional(),
        estimatedPrice: z.number(),
        photoUrls: z.array(photoUrlSchema),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const publicPhotoUrls = resolvePublicPhotoUrls(input.photoUrls, ctx.req);

        // Save to database
        await createEstimatorSubmission({
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          propertyAddress: input.propertyAddress,
          serviceType: input.serviceType,
          estimatedSquareFeet: input.estimatedSquareFeet,
          estimatedPrice: input.estimatedPrice,
          photoUrls: JSON.stringify(publicPhotoUrls),
          notes: input.notes,
        });

        // Send email to owner
        await sendEstimatorEmail({
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          propertyAddress: input.propertyAddress,
          serviceType: input.serviceType,
          estimatedSquareFeet: input.estimatedSquareFeet,
          estimatedPrice: input.estimatedPrice,
          photoUrls: publicPhotoUrls,
          notes: input.notes,
        });

        return {
          success: true,
        };
      } catch (error) {
        console.error("Estimator submission error:", error);
        throw new Error("Failed to submit estimate");
      }
    }),
});
