import {
  getRegistrationsService,
  sendInvitationService,
} from "@/services/hr/registrations";
import type { Request, Response, NextFunction } from "express";

export async function controller_fn(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get Request:", req.originalUrl);
}

export async function sendInvitation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get Request to send invitation:", req.body);
  try {
    const { name, email } = req.body;
    const result = await sendInvitationService(name, email);
    res.status(200).json({
      success: true,
      message: "An invitation has been sent to :" + email,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRegistrations(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for registration history.");
  try {
    const result = await getRegistrationsService();
    res.status(200).json({
      success: true,
      message: "You have got all invitations",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

const HRController = {
  getProfile: controller_fn,
  getProfiles: controller_fn,

  getRegistrations: getRegistrations,
  sendInvitation: sendInvitation,

  getBoardings: controller_fn,
  getBoarding: controller_fn,
  patchBoarding: controller_fn,

  getVisas: controller_fn,
  getVisa: controller_fn,
  patchVisa: controller_fn,
};
export default HRController;
