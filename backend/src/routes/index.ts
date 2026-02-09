import { Router } from "express";
import adminController from "@/controllers/admin";
import userController from "@/controllers/user";
import authRouter from "@/routes/auth";
import { jwtAuthenticate } from "@/middlewares/jwt-auth";
import { authorize } from "@/middlewares/authorize";

//import hrRouter from "@/routes/hr";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

// api open to employees, i.e. regular users
apiRouter.get(
  "/profile/me",
  jwtAuthenticate,
  authorize(["USER"]),
  userController.getProfile,
);

apiRouter.put(
  "/profile/me",
  jwtAuthenticate,
  authorize(["USER"]),
  userController.putProfile,
);

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
