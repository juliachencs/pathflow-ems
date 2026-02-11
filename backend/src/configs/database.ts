// import { Account } from "@/models/account.model";
// import { Employee } from "@/models/employee.model";
// import { Registration } from "@/models/registration.model";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI;

    if (!URI) {
      throw new Error("No MongoDB URI! Please check MONGO_URI field in .env!");
    }
    await mongoose.connect(URI);
    // await Registration.createCollection();
    // await Account.createCollection();
    // await Employee.createCollection();

    console.log("Database mounted");
  } catch (error) {
    console.error("Database connection failed");
    console.error(error);

    // force shut server if DB connection fails
    process.exit(1);
  }
};

export default connectDB;
