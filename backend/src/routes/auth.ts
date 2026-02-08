import { Router } from "express";
import authController from "@/controllers/auth";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/signout", authController.signout);
authRouter.post("/register", authController.register);

export default authRouter;
