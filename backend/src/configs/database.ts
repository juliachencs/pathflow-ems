import { HttpServerError } from "@/types/http.errors";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI;

    if (!URI) {
      throw new HttpServerError({
        code: "DB_CONNECT_FAIL",
      });
    }

    await mongoose.connect(URI);

    console.log("Database mounted");
  } catch (error) {
    console.error("Database connection failed");
    // force shut server if DB connection fails
    process.exit(1);
  }
};

export default connectDB;
