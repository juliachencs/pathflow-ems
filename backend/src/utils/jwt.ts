import jwt from "jsonwebtoken";
import type { JWTTokenPayload } from "@/types/common.js";

const JWTSecretKey = process.env.JWT_SECRET || "somethingsupersecret";
export function generateToken(payload: JWTTokenPayload): string {
  return jwt.sign(payload, JWTSecretKey, { expiresIn: "1h" });
}
