import { model, Schema, Types } from "mongoose";

const registrationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    registerToken: { type: String, required: true, unqiue: true },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    hasApplied: Boolean,
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
