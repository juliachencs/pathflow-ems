import HRController from "@/controllers/hr";
import { Router } from "express";

const hrRouter = Router();
const handler = (req, res) => {
  console.log("I am default handler");
  res.send("Hello, you are in the hr router" + req.originalUrl);
};
hrRouter.post("/registrations/invite", handler);
hrRouter.get("/registrations/history", handler);

// hrRouter.all("/{*splat}", (req, res) => {
//   res.send("Hello, you are in the hr router" + req.originalUrl);
// });

export default hrRouter;
