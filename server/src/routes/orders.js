import { Router } from "express";
import { prisma } from "../config/prisma.js";
import { calcShipping } from "../config/shipping.js";
import { generateOrderNumber } from "../utils/orderNumber.js";

const r = Router();

r.post("/", async (req, res) => {
  const { items, customer, paymentMethod, instapayRef, notes } = req.body;

  if (!items?.length) return res.status(400).json({ message: "Cart is empty" });
  if (!["COD", "INSTAPAY"].includes(paymentMethod))
    return res.status(400).json({ message: "Invalid payment method" });
  if (paymentMethod === "INSTAPAY" && !instapayRef)
    return res.status(400).json({ message: "InstaPay reference required" });

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });
  if (products.length !== productIds.length)
    return res.status(400).json({ message: "One or more products not found" });

  const unavailable = products.find((p) => p.availability === "UNAVAILABLE");
  if (unavailable)
    return res
      .status(409)
      .json({ message: `"${unavailable.nameEn}" is currently unavailable` });

  const lineItems = products.map((p) => {
    const qty = items.find((i) => i.productId === p.id).quantity;
    return {
      productId: p.id,
      nameEn: p.nameEn,
      nameAr: p.nameAr,
      image: p.images?.[0] || null,
      price: p.price,
      quantity: qty,
    };
  });

  const subtotal = lineItems.reduce(
    (s, i) => s + Number(i.price) * i.quantity,
    0,
  );
  const shippingFee = calcShipping(customer.governorate, subtotal);
  const total = subtotal + shippingFee;

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      addressStreet: customer.street,
      addressCity: customer.city,
      governorate: customer.governorate,
      paymentMethod,
      paymentStatus:
        paymentMethod === "INSTAPAY" ? "PENDING_VERIFICATION" : "UNPAID",
      instapayRef: instapayRef || null,
      notes,
      subtotal,
      shippingFee,
      total,
      items: { create: lineItems },
    },
    include: { items: true },
  });

  res.status(201).json(order);
});

r.get("/track/:orderNumber", async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { orderNumber: req.params.orderNumber },
    include: { items: true },
  });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

export default r;
