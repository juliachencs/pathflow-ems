import { Router } from "express";
import authRouter from "@/routes/auth.route";
import adminRouter from "@/routes/admin.route";
import userRouter from "@/routes/user.route";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use(adminRouter);
apiRouter.use(userRouter);

export default apiRouter;
