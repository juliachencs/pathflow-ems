import { Router } from "express";
import * as authController from "@/controllers/auth";

export const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/signout", authController.signout);
authRouter.post("/register", authController.register);
authRouter.post("/invite", authController.invite);
