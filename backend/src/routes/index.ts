import { Router } from "express";
import adminController from "@/controllers/admin";

import authRouter from "@/routes/auth";
import { jwtAuthenticate } from "@/middlewares/jwt-auth";
import { authorize } from "@/middlewares/authorize";
import userRouter from "@/routes/user";

//import hrRouter from "@/routes/hr";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use(userRouter);

// api open to hr, i.e. admin users
apiRouter.post(
  "/registrations/invite",
  jwtAuthenticate,
  authorize(["ADMIN"]),
  adminController.invitate,
);

apiRouter.get(
  "/registrations/history",
  jwtAuthenticate,
  authorize(["ADMIN"]),
  adminController.getRegistrations,
);

export default apiRouter;
