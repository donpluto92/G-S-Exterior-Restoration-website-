import nodemailer from "nodemailer";

interface EstimatorEmailData {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  serviceType: string;
  estimatedSquareFeet?: number;
  estimatedPrice: number;
  photoUrls: string[];
  notes?: string;
}

// Create transporter (using environment variables for credentials)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEstimatorEmail(data: EstimatorEmailData) {
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

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@gsrestoration.net",
      to: "npe2026@hotmail.com",
      subject: `New Estimator Submission: ${data.serviceType} - ${data.fullName}`,
      text: emailContent,
      replyTo: data.email,
    });

    console.log(`[Email] Estimator submission sent to npe2026@hotmail.com`);
  } catch (error) {
    console.error("[Email] Failed to send estimator email:", error);
    throw error;
  }
}
