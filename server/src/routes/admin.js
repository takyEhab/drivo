import { Router } from "express";
import { prisma } from "../config/prisma.js";
import { requireAuth, adminOnly } from "../middleware/auth.js";

const r = Router();
r.use(requireAuth, adminOnly);

// Dashboard stats
r.get("/stats", async (_, res) => {
  const [orders, revenue, pending, lowAvail] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { paymentStatus: "PAID" },
    }),
    prisma.order.count({ where: { status: { in: ["PENDING", "SOURCING"] } } }),
    prisma.product.count({ where: { availability: "UNAVAILABLE" } }),
  ]);
  res.json({
    orders,
    revenue: revenue._sum.total || 0,
    pending,
    unavailable: lowAvail,
  });
});

// Products
r.get("/products", async (_, res) => {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { updatedAt: "desc" },
  });
  res.json(products);
});

r.post("/products", async (req, res) => {
  const p = await prisma.product.create({ data: req.body });
  res.status(201).json(p);
});

r.put("/products/:id", async (req, res) => {
  const p = await prisma.product.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(p);
});

r.patch("/products/:id/availability", async (req, res) => {
  const p = await prisma.product.update({
    where: { id: req.params.id },
    data: { availability: req.body.availability },
  });
  res.json(p);
});

r.delete("/products/:id", async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

// Orders
r.get("/orders", async (req, res) => {
  const { status } = req.query;
  const orders = await prisma.order.findMany({
    where: status ? { status } : {},
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
});

r.get("/orders/:id", async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: {
      items: { include: { product: { include: { supplier: true } } } },
    },
  });
  res.json(order);
});

r.patch("/orders/:id/status", async (req, res) => {
  const o = await prisma.order.update({
    where: { id: req.params.id },
    data: { status: req.body.status },
  });
  res.json(o);
});

r.patch("/orders/:id/verify-instapay", async (req, res) => {
  const o = await prisma.order.update({
    where: { id: req.params.id },
    data: { paymentStatus: "PAID", status: "CONFIRMED" },
  });
  res.json(o);
});

export default r;
