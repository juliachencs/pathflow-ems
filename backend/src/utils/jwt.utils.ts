import jwt from "jsonwebtoken";
import type { IUser } from "../types/user.interface.ts";

const JWT_SecretKey = process.env.JWT_SECRET || "somethingsupersecret";

export function generateToken(user: IUser): string {
  const payload = {
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SecretKey, { expiresIn: "1h" });
}
