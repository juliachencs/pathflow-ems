import { model, Schema, Types } from "mongoose";

export interface IRegistration {
  name: string;
  email: string;
  registerToken: string;
  employeeId: Types.ObjectId;
  updatedAt: Date;
  createdAt: Date;
}
const registrationSchema = new Schema<IRegistration>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    registerToken: { type: String, required: true, unqiue: true },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
  },
);

export const Registration = model(
  "registration", // model name
  registrationSchema, // schema
  "registrations", // collection name
);
