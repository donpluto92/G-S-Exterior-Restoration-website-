import express, { Request, Response } from "express";
import multer from "multer";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

const router = express.Router();

// Middleware to parse form data
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Validate file type
    const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type" });
    }

    // Validate file size (10MB max)
    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: "File too large" });
    }

    // Upload to storage
    const fileKey = `estimator-photos/${nanoid()}-${req.file.originalname}`;
    const { url } = await storagePut(fileKey, req.file.buffer, req.file.mimetype);

    res.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
