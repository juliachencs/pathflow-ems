import type { Request, Response, NextFunction } from "express";

export async function controller_fn(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get Request:", req.originalUrl);
}

export async function invite(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    console.log("request to invite:", req.body);

    // request validation
    const isValid = hasAllRequiredFields<{ name: string; email: string }>(
      req.body,
      ["name", "email"],
    );
    if (!isValid) {
      throw new HttpBadRequestError<void>({
        code: "INVITE_BAD_REQUEST",
      });
    }

    const { name, email } = req.body;
    await inviteService(name, email);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
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
