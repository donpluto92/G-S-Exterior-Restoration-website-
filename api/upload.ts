import Busboy from "busboy";
import { nanoid } from "nanoid";
import { storagePut } from "../server/storage";

export const config = {
  api: {
    bodyParser: false,
  },
};

type UploadedFile = {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  size: number;
};

function parseUpload(req: any): Promise<UploadedFile> {
  return new Promise((resolve, reject) => {
    const contentType = req.headers["content-type"];
    if (!contentType) {
      reject(new Error("Missing content type"));
      return;
    }

    const busboy = Busboy({ headers: req.headers });
    let upload: UploadedFile | null = null;
    const chunks: Buffer[] = [];

    busboy.on("file", (fieldName, file, info) => {
      if (fieldName !== "file") {
        file.resume();
        return;
      }

      const { filename, mimeType } = info;
      let size = 0;

      file.on("data", (chunk: Buffer) => {
        size += chunk.length;
        chunks.push(chunk);
      });

      file.on("limit", () => {
        reject(new Error("File too large"));
      });

      file.on("end", () => {
        upload = {
          buffer: Buffer.concat(chunks),
          filename,
          mimeType,
          size,
        };
      });
    });

    busboy.on("error", reject);
    busboy.on("finish", () => {
      if (!upload) {
        reject(new Error("No file provided"));
        return;
      }

      resolve(upload);
    });

    req.pipe(busboy);
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const file = await parseUpload(req);
    const allowedMimes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedMimes.includes(file.mimeType)) {
      res.status(400).json({ error: "Invalid file type" });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      res.status(400).json({ error: "File too large" });
      return;
    }

    const fileKey = `estimator-photos/${nanoid()}-${file.filename}`;
    const { url } = await storagePut(fileKey, file.buffer, file.mimeType);

    res.status(200).json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
}
