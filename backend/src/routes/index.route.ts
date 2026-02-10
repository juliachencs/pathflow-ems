import { Router } from "express";
import adminController from "@/controllers/admin.controller";

import authRouter from "@/routes/auth.route";
import { jwtAuthenticate } from "@/middlewares/jwt-auth";
import { authorize } from "@/middlewares/authorize";
import userRouter from "@/routes/user.route";

//import hrRouter from "@/routes/hr";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use(userRouter);

export default apiRouter;
