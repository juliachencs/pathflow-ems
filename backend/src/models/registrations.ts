import { model, Schema } from "mongoose";

const registrationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, required: true },
    createAt: { type: Date, required: true, default: Date.now },
  },
  {
    virtuals: {
      isExpired: {
        get() {
          const expirationTimeInMs = 3 * 60 * 1000; // e.g., 3 hours
          return Date.now() - this.createAt.getTime() > expirationTimeInMs;
        },
      },
    },
  },
);

export const Registration = model(
  "registrations", // model name
  registrationSchema, // schema
  "registrations", // collection name
);
