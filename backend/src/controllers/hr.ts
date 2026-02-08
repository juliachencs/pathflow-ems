import type { Request, Response, NextFunction } from "express";

export async function controller_fn(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get Request:", req.originalUrl);
}

const HRController = {
  getProfile: controller_fn,
  getProfiles: controller_fn,

  getRegistrations: controller_fn,
  sendInvitation: controller_fn,

  getBoardings: controller_fn,
  getBoarding: controller_fn,
  patchBoarding: controller_fn,

  getVisas: controller_fn,
  getVisa: controller_fn,
  patchVisa: controller_fn,
};
export default HRController;
