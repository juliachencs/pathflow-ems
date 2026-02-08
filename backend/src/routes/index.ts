import { Router } from "express";

import authRouter from "@/routes/auth";
import employeeRouter from "@/routes/employee";
import hrRouter from "@/routes/hr";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

// match all URLs that ends with me
apiRouter.use(["/profile/me", "/visa/me", "/boarding/me"], employeeRouter);

// match url has patterns: boardings | visas | profiles | registrations
apiRouter.use(
  ["/registrations", "/boardings", "/profiles", "registrations"],
  hrRouter,
);

export default apiRouter;
