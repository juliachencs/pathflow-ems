import { Roles, type Role } from "@/types/auth.interface";
import { model, Schema, Types } from "mongoose";

export interface IAccount {
  username: string;
  password: string;
  role: Role;
  email: string;
  employeeId: Types.ObjectId;
}

const accountSchema = new Schema<IAccount>({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: Roles, default: "USER", required: true },
  email: { type: String, required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
});

export const Account = model("Account", accountSchema, "accounts");
