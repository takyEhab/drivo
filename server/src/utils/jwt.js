import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const sign = (payload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpires });
export const verify = (token) => jwt.verify(token, env.jwtSecret);
