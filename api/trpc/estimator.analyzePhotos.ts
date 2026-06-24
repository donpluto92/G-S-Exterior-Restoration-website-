import { initTRPC } from "@trpc/server";
import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http";
import superjson from "superjson";
import { z } from "zod";

const serviceTypeSchema = z.enum(["driveway", "deck", "siding", "vehicle", "patio", "walkway"]);
const photoUrlSchema = z.string().min(1);

type RequestLike = {
  headers?: Record<string, string | string[] | undefined>;
  protocol?: string;
};

type TrpcContext = {
  req: RequestLike;
  res: unknown;
  user: null;
};

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

function firstHeaderValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getRequestOrigin(req: RequestLike) {
  const headers = req.headers ?? {};
  const forwardedProto = firstHeaderValue(headers["x-forwarded-proto"]);
  const forwardedHost = firstHeaderValue(headers["x-forwarded-host"]);
  const protocol = forwardedProto?.split(",")[0]?.trim() || req.protocol || "https";
  const host = forwardedHost?.split(",")[0]?.trim() || headers.host;

  if (!host) {
    throw new Error("Could not resolve request host for uploaded photos");
  }

  return `${protocol}://${host}`;
}

function resolvePublicPhotoUrls(photoUrls: string[], req: RequestLike) {
  const origin = getRequestOrigin(req);
  return photoUrls.map((url) => new URL(url, origin).toString());
}

async function invokeLLM(messages: unknown[]) {
  const forgeApiUrl = process.env.BUILT_IN_FORGE_API_URL || "https://forge.manus.im";
  const forgeApiKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!forgeApiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const response = await fetch(
    `${forgeApiUrl.replace(/\/+$/, "")}/v1/chat/completions`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${forgeApiKey}`,
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash",
        messages,
        max_tokens: 32768,
        thinking: {
          budget_tokens: 128,
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LLM invoke failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json() as Promise<{
    choices: Array<{
      message: {
        content: string | Array<{ type: string; text?: string }>;
      };
    }>;
  }>;
}

const pricingMatrix = {
  driveway: { min: 0.15, max: 0.35, avg: 0.25 },
  deck: { min: 0.20, max: 0.40, avg: 0.30 },
  siding: { min: 0.10, max: 0.25, avg: 0.18 },
  vehicle: { min: 50, max: 150, avg: 100 },
  patio: { min: 0.15, max: 0.35, avg: 0.25 },
  walkway: { min: 0.15, max: 0.30, avg: 0.22 },
};

const estimatorRouter = t.router({
  analyzePhotos: t.procedure
    .input(
      z.object({
        photoUrls: z.array(photoUrlSchema),
        serviceType: serviceTypeSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const publicPhotoUrls = resolvePublicPhotoUrls(input.photoUrls, ctx.req);
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

      const response = await invokeLLM([
        {
          role: "user",
          content: [
            {
              type: "text",
              text: analysisPrompt,
            },
            ...publicPhotoUrls.map((url) => ({
              type: "image_url",
              image_url: {
                url,
                detail: "high",
              },
            })),
          ],
        },
      ]);

      const messageContent = response.choices[0]?.message.content;
      const analysisText =
        typeof messageContent === "string"
          ? messageContent
          : messageContent?.find((part) => part.type === "text")?.text ?? "";

      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not parse LLM response");
      }

      const analysis = JSON.parse(jsonMatch[0]) as {
        estimatedSquareFeet: number;
        condition: "poor" | "fair" | "good" | "excellent";
        notes: string;
      };

      const pricing = pricingMatrix[input.serviceType];
      let pricePerUnit = pricing.avg;

      if (analysis.condition === "poor") {
        pricePerUnit *= 1.3;
      } else if (analysis.condition === "fair") {
        pricePerUnit *= 1.1;
      } else if (analysis.condition === "excellent") {
        pricePerUnit *= 0.9;
      }

      const estimatedPrice =
        input.serviceType === "vehicle"
          ? Math.round(pricePerUnit * 100)
          : Math.round(analysis.estimatedSquareFeet * pricePerUnit * 100);

      return {
        estimatedSquareFeet: analysis.estimatedSquareFeet,
        estimatedPrice,
        condition: analysis.condition,
        notes: analysis.notes,
      };
    }),
});

const apiRouter = t.router({
  estimator: estimatorRouter,
});

export default async function handler(req: any, res: any) {
  return nodeHTTPRequestHandler({
    req,
    res,
    path: "estimator.analyzePhotos",
    router: apiRouter,
    createContext: () => ({
      req,
      res,
      user: null,
    }),
  });
}
