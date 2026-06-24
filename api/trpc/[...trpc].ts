import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http";
import { router } from "../../server/_core/trpc";
import { estimatorRouter } from "../../server/routers/estimator";

const apiRouter = router({
  estimator: estimatorRouter,
});

function getPath(req: any) {
  const trpcPath = req.query?.trpc;
  if (Array.isArray(trpcPath)) return trpcPath.join("/");
  return trpcPath || "";
}

export default async function handler(req: any, res: any) {
  return nodeHTTPRequestHandler({
    req,
    res,
    path: getPath(req),
    router: apiRouter,
    createContext: () => ({
      req,
      res,
      user: null,
    }),
  });
}
