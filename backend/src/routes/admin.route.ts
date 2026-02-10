import { Router } from "express";
import { jwtAuthenticate } from "@/middlewares/jwt-auth";
import { authorize } from "@/middlewares/authorize";
import adminController from "@/controllers/admin.controller";

// api open to employees, i.e. regular users
const adminRouter = Router();
const middlewares = [jwtAuthenticate, authorize(["ADMIN"])];

// profile
adminRouter.get("/profiles/:id", middlewares, adminController.getProfile);
adminRouter.get("/profiles", middlewares, adminController.getProfiles);

//boarding
adminRouter.get("/boardings/:id", middlewares, adminController.getBoarding);
adminRouter.get("/boardings", middlewares, adminController.getBoardings);
adminRouter.patch(
  "/boardings/:id",
  middlewares,
  adminController.reviewBoarding,
);

//visa
adminRouter.get(
  "/visas/progress",
  middlewares,
  adminController.getProgressVisas,
);
adminRouter.get("/visas/all", middlewares, adminController.getAllVisas);
adminRouter.patch("/visas/:id", middlewares, adminController.reviewVisa);

// api open to hr, i.e. admin users
adminRouter.post(
  "/registrations/invite",
  middlewares,
  adminController.invitate,
);

adminRouter.get(
  "/registrations/history",
  middlewares,
  adminController.getRegistrations,
);

export default adminRouter;
