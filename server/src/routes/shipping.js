import { Router } from "express";
import {
  GOVERNORATES,
  calcShipping,
  FREE_SHIPPING_THRESHOLD,
} from "../config/shipping.js";

const r = Router();

r.get("/governorates", (_, res) => {
  const list = Object.entries(GOVERNORATES).map(([key, v]) => ({ key, ...v }));
  res.json({
    governorates: list,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
  });
});

r.post("/quote", (req, res) => {
  const { governorate, subtotal } = req.body;
  const fee = calcShipping(governorate, Number(subtotal) || 0);
  res.json({ fee });
});

export default r;
