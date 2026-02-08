import { model, Schema } from "mongoose";

const registrationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    registerToken: { type: String, required: true, index: true },
    createAt: { type: Date, required: true, default: Date.now },
  },
  {
    virtuals: {
      isExpired: {
        get() {
          const expirationTimeInMs = 3 * 60 * 60 * 1000; // e.g., 3 hours
          return Date.now() - this.createAt.getTime() > expirationTimeInMs;
        },
      },
      expireAt: {
        get() {
          const hoursToAddInMs = 3 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
          const newTime = this.createAt.getTime() + hoursToAddInMs;
          return new Date(newTime);
        },
      },
    },
  },
);

export const Registration = model(
  "registration", // model name
  registrationSchema, // schema
  "registrations", // collection name
);
