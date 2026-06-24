function getPath(req: any) {
  const path = req.query?.path;
  if (Array.isArray(path)) return path.join("/");
  return path || "";
}

function getForgeConfig() {
  const forgeUrl = process.env.BUILT_IN_FORGE_API_URL;
  const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!forgeUrl || !forgeKey) {
    throw new Error(
      "Storage config missing: set BUILT_IN_FORGE_API_URL and BUILT_IN_FORGE_API_KEY",
    );
  }

  return { forgeUrl: forgeUrl.replace(/\/+$/, ""), forgeKey };
}

async function storageGetSignedUrl(relKey: string): Promise<string> {
  const { forgeUrl, forgeKey } = getForgeConfig();
  const key = relKey.replace(/^\/+/, "");

  const getUrl = new URL("v1/storage/presign/get", forgeUrl + "/");
  getUrl.searchParams.set("path", key);

  const resp = await fetch(getUrl, {
    headers: { Authorization: `Bearer ${forgeKey}` },
  });

  if (!resp.ok) {
    const msg = await resp.text().catch(() => resp.statusText);
    throw new Error(`Storage signed URL failed (${resp.status}): ${msg}`);
  }

  const { url } = (await resp.json()) as { url: string };
  return url;
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
