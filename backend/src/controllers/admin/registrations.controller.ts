import {
  getRegistrationsService,
  sendInvitationService,
} from "@/services/registrations.service";
import type { Request, Response, NextFunction } from "express";

export async function sendInvitation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get Request to send invitation:", req.body);
  try {
    const { name, email } = req.body;
    const { message, data } = await sendInvitationService(name, email);

    res.status(200).json({
      success: true,
      message,
      data,
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
    const { message, data } = await getRegistrationsService();
    res.status(200).json({
      success: true,
      message,
      data,
    });
  } catch (error) {
    next(error);
  }
}
