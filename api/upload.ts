import Busboy from "busboy";
import { nanoid } from "nanoid";

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

function getForgeConfig() {
  const forgeUrl = process.env.BUILT_IN_FORGE_API_URL || "https://forge.manus.im";
  const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!forgeKey) {
    throw new Error("Storage config missing: set BUILT_IN_FORGE_API_KEY");
  }

  return { forgeUrl: forgeUrl.replace(/\/+$/, ""), forgeKey };
}

function appendHashSuffix(relKey: string): string {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  if (lastDot === -1) return `${relKey}_${hash}`;
  return `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}

async function storagePut(
  relKey: string,
  data: Buffer,
  contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  const { forgeUrl, forgeKey } = getForgeConfig();
  const key = appendHashSuffix(relKey.replace(/^\/+/, ""));

  const presignUrl = new URL("v1/storage/presign/put", forgeUrl + "/");
  presignUrl.searchParams.set("path", key);

  const presignResp = await fetch(presignUrl, {
    headers: { Authorization: `Bearer ${forgeKey}` },
  });

  if (!presignResp.ok) {
    const msg = await presignResp.text().catch(() => presignResp.statusText);
    throw new Error(`Storage presign failed (${presignResp.status}): ${msg}`);
  }

  const { url: s3Url } = (await presignResp.json()) as { url: string };
  if (!s3Url) throw new Error("Forge returned empty presign URL");

  const uploadResp = await fetch(s3Url, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: new Blob([data as any], { type: contentType }),
  });

  if (!uploadResp.ok) {
    throw new Error(`Storage upload to S3 failed (${uploadResp.status})`);
  }

  return { key, url: `/api/manus-storage/${key}` };
}

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
