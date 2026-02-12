import { Router } from "express";
import userController from "@/controllers/user.controller";
import { jwtAuthenticate } from "@/middlewares/jwt-auth";
import { authorize } from "@/middlewares/authorize";

// api open to employees, i.e. regular users
const userRouter = Router();
const middlewares = [jwtAuthenticate, authorize(["USER"])];

// profile
userRouter.get("/profile/me", middlewares, userController.getProfile);
userRouter.put("/profile/me", middlewares, userController.updateProfile);

//boarding
userRouter.get("/boarding/me", middlewares, userController.getBoarding);
userRouter.put("/boarding/me", middlewares, userController.submitBoarding);
userRouter.post("/boarding/me", middlewares, userController.submitBoarding);

//visa
userRouter.get("/visa/me", middlewares, userController.getVisaStaus);
userRouter.patch("/visa/me", middlewares, userController.submitVisaDocument);

export default userRouter;
