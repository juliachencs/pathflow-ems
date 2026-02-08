import { Roles } from "@/types/common";
import { model, Schema } from "mongoose";

const accountSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Roles, default: "USER" },
  employeeID: { type: Schema.Types.ObjectId, ref: "Employee" },
});

export const Accounts = model("accounts", accountSchema);
