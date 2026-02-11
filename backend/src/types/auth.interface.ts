import type { ApplyState } from "@/types/common";
import type { VisaState } from "@/types/visa.interface";
import type { JwtPayload } from "jsonwebtoken";

export const Roles = ["ADMIN", "USER"] as const;
export type Role = (typeof Roles)[number];

export interface IAuthPayload extends JwtPayload {
  role: Role;
  accountId: string;
  employeeId: string;
}

export interface IAuthData {
  username: string;
  role: Role;
  employeeId: string;
  profileImage: string;
  boarding: ApplyState;
  visa: VisaState;
  accessToken: string;
}
