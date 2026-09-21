import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { sign } from "../utils/jwt.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();

r.post("/register", async (req, res) => {
  const { email, password, name, phone } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email & password required" });
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists)
    return res.status(409).json({ message: "Email already registered" });
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hash, name, phone },
  });
  res.json({
    token: sign({ id: user.id, role: user.role }),
    user: { id: user.id, email, name },
  });
});

r.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  res.json({
    token: sign({ id: user.id, role: user.role }),
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
});

r.get("/me", requireAuth, (req, res) => {
  const { id, email, name, role } = req.user;
  res.json({ id, email, name, role });
});

export default r;
