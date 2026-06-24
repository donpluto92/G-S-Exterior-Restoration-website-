import express from "express";
import { registerStorageProxy } from "../../server/_core/storageProxy";

const app = express();

registerStorageProxy(app);

export default app;
