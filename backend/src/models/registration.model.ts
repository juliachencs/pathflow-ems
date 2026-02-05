import type { IRegistration } from "@/types/registration.interface";
import { model, Schema } from "mongoose";

const RegistrationSchema = new Schema<IRegistration>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  createAt: { type: Date, required: true, default: Date.now },
});

export const Registration = model<IRegistration>(
  "registrations",
  RegistrationSchema,
);
