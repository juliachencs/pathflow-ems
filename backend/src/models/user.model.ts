import type { IUser } from "@/types/user.interface.ts";
import { model, Schema } from "mongoose";
import { Role } from "@/types/role.enum";

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), default: Role.EMPLOYEE },
});

export const User = model<IUser>("accounts", UserSchema);
