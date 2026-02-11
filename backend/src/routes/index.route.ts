import { Router } from "express";
import authRouter from "@/routes/auth.route";
// import userRouter from "@/routes/user.route";

//import hrRouter from "@/routes/hr";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
// apiRouter.use(userRouter);

export default apiRouter;
