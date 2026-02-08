import { Router } from "express";

import authRouter from "./auth";
import employeeRouter from "@/routes/employee";
import hrRouter from "@/routes/hr";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

// match all URLs that ends with me
apiRouter.use(/\/me$/, employeeRouter);

// match url has patterns: boardings | visas | profiles | registrations
apiRouter.use("/{*splat}s/*", hrRouter);

export default apiRouter;
