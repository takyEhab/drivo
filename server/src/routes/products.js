import { Router } from "express";
import { prisma } from "../config/prisma.js";

const r = Router();

r.get("/", async (req, res) => {
  const {
    category,
    search,
    availability,
    featured,
    page = 1,
    limit = 24,
  } = req.query;
  const where = { isPublished: true };
  if (category) where.category = { slug: category };
  if (availability) where.availability = availability;
  if (featured === "true") where.isFeatured = true;
  if (search)
    where.OR = [
      { nameEn: { contains: search, mode: "insensitive" } },
      { nameAr: { contains: search, mode: "insensitive" } },
    ];
  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    }),
    prisma.product.count({ where }),
  ]);
  res.json({
    items,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
});

r.get("/:slug", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
    include: { category: true },
  });
  if (!product || !product.isPublished)
    return res.status(404).json({ message: "Not found" });
  res.json(product);
});

export default r;
