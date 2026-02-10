import {
  getRegistrationsService,
  sendInvitationService,
} from "@/services/registrations.service";
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
    const { history, isResent } = await sendInvitationService(name, email);
    const messages = {
      resent: "We have sent an invitation to :" + email + ".",
      sent: "We have re-sent an invitation to :" + email + ".",
    };
    res.status(200).json({
      success: true,
      message: isResent ? messages["resent"] : messages["sent"],
      data: history,
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

const adminController = {
  getProfile: controller_fn,
  getProfiles: controller_fn,

  getRegistrations: getRegistrations,
  invitate: sendInvitation,

  getBoardings: controller_fn,
  getBoarding: controller_fn,
  patchBoarding: controller_fn,

  getVisas: controller_fn,
  getVisa: controller_fn,
  patchVisa: controller_fn,
};
export default adminController;
