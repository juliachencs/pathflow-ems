import { Router } from "express";
import adminController from "@/controllers/admin";
import userController from "@/controllers/user";
import authRouter from "@/routes/auth";

//import hrRouter from "@/routes/hr";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

// api open to employees, i.e. regular users
apiRouter.get("/profile/me", userController.getProfile);
apiRouter.put("/profile/me", userController.putProfile);

// api open to hr, i.e. admin users
apiRouter.post("/registrations/invite", adminController.invitate);
apiRouter.get("/registrations/history", adminController.getRegistrations);

export default apiRouter;
