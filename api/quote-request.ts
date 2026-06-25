import Busboy from "busboy";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false,
  },
};

type UploadedPhoto = {
  filename: string;
  mimeType: string;
  buffer: Buffer;
  size: number;
};

type QuoteFields = {
  serviceType?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  propertyAddress?: string;
  approximateSize?: string;
  condition?: string;
  timeline?: string;
  notes?: string;
};

const serviceLabels: Record<string, string> = {
  driveway: "Driveway Cleaning",
  deck: "Deck Cleaning",
  siding: "Siding Washing",
  vehicle: "Vehicle Washing",
  patio: "Patio Cleaning",
  walkway: "Walkway Cleaning",
};

function parseRequest(req: any): Promise<{ fields: QuoteFields; photos: UploadedPhoto[] }> {
  return new Promise((resolve, reject) => {
    const contentType = req.headers["content-type"];
    if (!contentType) {
      reject(new Error("Missing content type"));
      return;
    }

    const fields: QuoteFields = {};
    const photos: UploadedPhoto[] = [];
    const busboy = Busboy({
      headers: req.headers,
      limits: {
        files: 8,
        fileSize: 10 * 1024 * 1024,
      },
    });

    busboy.on("field", (name, value) => {
      fields[name as keyof QuoteFields] = value;
    });

    busboy.on("file", (fieldName, file, info) => {
      if (fieldName !== "photos") {
        file.resume();
        return;
      }

      const chunks: Buffer[] = [];
      let size = 0;
      file.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
        size += chunk.length;
      });
      file.on("limit", () => reject(new Error("Photo is too large")));
      file.on("end", () => {
        photos.push({
          filename: info.filename || "quote-photo.jpg",
          mimeType: info.mimeType || "application/octet-stream",
          buffer: Buffer.concat(chunks),
          size,
        });
      });
    });

    busboy.on("error", reject);
    busboy.on("finish", () => resolve({ fields, photos }));
    req.pipe(busboy);
  });
}

function requireField(fields: QuoteFields, name: keyof QuoteFields) {
  const value = fields[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

async function saveSubmission(fields: Required<Pick<QuoteFields, "serviceType" | "fullName" | "email" | "phone" | "propertyAddress">> & QuoteFields) {
  if (!process.env.DATABASE_URL) return;

  const notes = [
    fields.notes,
    fields.approximateSize ? `Approximate size: ${fields.approximateSize}` : "",
    fields.condition ? `Condition: ${fields.condition}` : "",
    fields.timeline ? `Timeline: ${fields.timeline}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  try {
    await connection.execute(
      `INSERT INTO estimator_submissions
        (fullName, email, phone, propertyAddress, serviceType, estimatedSquareFeet, estimatedPrice, photoUrls, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fields.fullName,
        fields.email,
        fields.phone,
        fields.propertyAddress,
        fields.serviceType,
        null,
        null,
        "Photos attached to quote request email",
        notes || null,
      ],
    );
  } finally {
    await connection.end();
  }
}

async function sendEmail(fields: Required<Pick<QuoteFields, "serviceType" | "fullName" | "email" | "phone" | "propertyAddress">> & QuoteFields, photos: UploadedPhoto[]) {
  const serviceLabel = serviceLabels[fields.serviceType] || fields.serviceType;
  const emailContent = `
New Quote Request from G&S Exterior Restoration Website

Customer Information:
- Name: ${fields.fullName}
- Email: ${fields.email}
- Phone: ${fields.phone}
- Property Address: ${fields.propertyAddress}

Job Details:
- Service Type: ${serviceLabel}
- Approximate Size: ${fields.approximateSize || "Not provided"}
- Condition: ${fields.condition || "Not sure"}
- Preferred Timeline: ${fields.timeline || "Not provided"}
- Customer Notes: ${fields.notes || "None"}

Photos Attached: ${photos.length}

Suggested next step:
Reply directly to this email or call/text the customer with a quote or follow-up question.

---
This is an automated message from the G&S Exterior Restoration quote request form.
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
    subject: `New Quote Request: ${serviceLabel} - ${fields.fullName}`,
    text: emailContent,
    replyTo: fields.email,
    attachments: photos.map((photo, index) => ({
      filename: photo.filename || `quote-photo-${index + 1}.jpg`,
      content: photo.buffer,
      contentType: photo.mimeType,
    })),
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { fields, photos } = await parseRequest(req);
    const requiredFields = {
      serviceType: requireField(fields, "serviceType"),
      fullName: requireField(fields, "fullName"),
      email: requireField(fields, "email"),
      phone: requireField(fields, "phone"),
      propertyAddress: requireField(fields, "propertyAddress"),
      approximateSize: fields.approximateSize || "",
      condition: fields.condition || "Not sure",
      timeline: fields.timeline || "",
      notes: fields.notes || "",
    };

    await saveSubmission(requiredFields);
    await sendEmail(requiredFields, photos);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("[QuoteRequest] failed:", error);
    res.status(500).json({ error: "Quote request failed" });
  }
}
