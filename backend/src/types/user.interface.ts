import { Role } from "./role.enum";

export interface IUser {
  username: string;
  password: string;
  role: Role;
}
