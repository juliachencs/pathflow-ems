import type { Request } from "express";
import type { Role } from "@/types/employee";
import type { Types } from "mongoose";
import type { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
  role: Role;
  accountId: Types.ObjectId;
  empolyeeId: Types.ObjectId;
}

export interface AuthRequest extends Request {
  auth: AuthPayload;
}
