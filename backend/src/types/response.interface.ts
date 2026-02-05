import type { Role } from "./role.enum.js";

export interface IAuthRespond {
  role: Role;
  token: string;
}
