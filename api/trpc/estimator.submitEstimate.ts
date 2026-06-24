import { initTRPC } from "@trpc/server";
import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
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

type EstimatorSubmission = {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  serviceType: z.infer<typeof serviceTypeSchema>;
  estimatedSquareFeet?: number;
  estimatedPrice: number;
  photoUrls: string[];
  notes?: string;
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

async function createEstimatorSubmission(data: EstimatorSubmission) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("Database not available");
  }

  const connection = await mysql.createConnection(databaseUrl);
  try {
    await connection.execute(
      `INSERT INTO estimator_submissions
        (fullName, email, phone, propertyAddress, serviceType, estimatedSquareFeet, estimatedPrice, photoUrls, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.fullName,
        data.email,
        data.phone,
        data.propertyAddress,
        data.serviceType,
        data.estimatedSquareFeet ?? null,
        data.estimatedPrice,
        JSON.stringify(data.photoUrls),
        data.notes ?? null,
      ],
    );
  } finally {
    await connection.end();
  }
}

async function sendEstimatorEmail(data: EstimatorSubmission) {
  const priceInDollars = (data.estimatedPrice / 100).toFixed(2);
  const sqftText =
    data.serviceType === "vehicle"
      ? ""
      : `\nEstimated Square Footage: ${data.estimatedSquareFeet} sq ft`;
  const emailContent = `
New Estimator Submission from G&S Exterior Restoration Website

Customer Information:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}
- Property Address: ${data.propertyAddress}

Service Details:
- Service Type: ${data.serviceType}${sqftText}
- Estimated Price: $${priceInDollars}
- Customer Notes: ${data.notes || "None"}

Photos Submitted: ${data.photoUrls.length}
${data.photoUrls.map((url, i) => `- Photo ${i + 1}: ${url}`).join("\n")}

---
This is an automated message from the G&S Exterior Restoration estimator system.
Customer email: ${data.email}
Customer phone: ${data.phone}
  `;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "noreply@gsrestoration.net",
    to: "npe2026@hotmail.com",
    subject: `New Estimator Submission: ${data.serviceType} - ${data.fullName}`,
    text: emailContent,
    replyTo: data.email,
  });
}

const estimatorRouter = t.router({
  submitEstimate: t.procedure
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
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const publicPhotoUrls = resolvePublicPhotoUrls(input.photoUrls, ctx.req);
      const submission = {
        ...input,
        photoUrls: publicPhotoUrls,
      };

      await createEstimatorSubmission(submission);
      await sendEstimatorEmail(submission);

      return {
        success: true,
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
    path: "estimator.submitEstimate",
    router: apiRouter,
    createContext: () => ({
      req,
      res,
      user: null,
    }),
  });
}
