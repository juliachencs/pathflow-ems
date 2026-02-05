import { Router } from "express";

import { authRouter } from "./auth";

export const rootRouter = Router();
rootRouter.use("/auth", authRouter);
