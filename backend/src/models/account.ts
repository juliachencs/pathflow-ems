import { Roles } from "@/types/employee";
import { model, Schema } from "mongoose";

const accountSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: Roles, default: "USER", required: true },
  email: String,
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
});

export const Account = model("Account", accountSchema, "accounts");
