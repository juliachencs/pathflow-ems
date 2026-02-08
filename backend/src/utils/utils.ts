import jwt from "jsonwebtoken";
import type { JWTTokenPayload } from "@/types/common.js";
import bcrypt from "bcrypt";

const JWTSecretKey = process.env.JWT_SECRET || "somethingsupersecret";
export function generateToken(payload: JWTTokenPayload): string {
  return jwt.sign(payload, JWTSecretKey, { expiresIn: "1h" });
}

export async function hashPassWord(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export function hasKeys<T>(
  obj: Record<string, unknown>,
  keys: readonly string[],
): obj is Record<(typeof keys)[number], unknown> {
  // Check for null and undefined only
  if (obj === null || obj === undefined) {
    return false;
  }
  // Check if object
  if (typeof obj !== "object") {
    return false;
  }

  for (const key in keys) {
    if (!(key in obj)) {
      return false;
    }
  }

  return true;
}
