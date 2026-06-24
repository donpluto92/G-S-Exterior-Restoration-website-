import { storageGetSignedUrl } from "../../server/storage";

function getPath(req: any) {
  const path = req.query?.path;
  if (Array.isArray(path)) return path.join("/");
  return path || "";
}

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).send("Method not allowed");
    return;
  }

  const key = getPath(req);
  if (!key) {
    res.status(400).send("Missing storage key");
    return;
  }

  try {
    const url = await storageGetSignedUrl(key);
    res.setHeader("Cache-Control", "no-store");
    res.redirect(307, url);
  } catch (error) {
    console.error("[StorageProxy] failed:", error);
    res.status(502).send("Storage proxy error");
  }
}
