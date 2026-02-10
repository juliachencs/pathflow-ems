import type { Request } from "express";
import type { Role } from "@/types/common";
import type { JwtPayload } from "jsonwebtoken";

export interface IAuthPayload extends JwtPayload {
  role: Role;
  accountId: string;
  empolyeeId: string;
}

// export interface IAuthRequest extends Request {
//   auth: IAuthPayload;
// }
