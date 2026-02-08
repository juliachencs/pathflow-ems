import { Router } from "express";

const employeeRouter = Router();

employeeRouter.all("/*{splat}", (req, res) => {
  res.send("Hello, you are in the employee router:" + req.originalUrl);
});

export default employeeRouter;
