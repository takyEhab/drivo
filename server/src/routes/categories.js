import { Router } from "express";
import { prisma } from "../config/prisma.js";

const r = Router();
r.get("/", async (_, res) => res.json(await prisma.category.findMany()));
export default r;
