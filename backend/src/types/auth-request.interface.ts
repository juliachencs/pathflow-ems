import type { Request } from "express";
import type { Role } from "@/types/common";
import type { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
  role: Role;
  accountId: string;
  empolyeeId: string;
}

export interface AuthRequest extends Request {
  auth: AuthPayload;
}
