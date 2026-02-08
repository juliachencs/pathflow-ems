import { Router } from "express";

const hrRouter = Router();

hrRouter.all("/{*splat}", (req, res) => {
  res.send("Hello, you are in the hr router" + req.originalUrl);
});

export default hrRouter;
