import express from "express";
import uploadRouter from "../server/upload";

const app = express();

app.use("/api", uploadRouter);

export default app;
