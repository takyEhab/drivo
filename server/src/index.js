import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import orderRoutes from "./routes/orders.js";
import shippingRoutes from "./routes/shipping.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";

const app = express();
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

app.use(errorHandler);

app.listen(env.port, () => console.log(`🚀 Drivo API on :${env.port}`));
