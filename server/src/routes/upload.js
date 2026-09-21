import { Router } from "express";
import multer from "multer";
import { requireAuth, adminOnly } from "../middleware/auth.js";
import { uploadBuffer } from "../utils/cloudinary.js";

const r = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

r.post(
  "/image",
  requireAuth,
  adminOnly,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file" });
    const result = await uploadBuffer(req.file.buffer);
    res.json({ url: result.secure_url });
  },
);

export default r;
