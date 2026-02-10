import {
  getBoardingService,
  listAllBoardingService,
  listBoardingService,
  reviewBoardingService,
} from "@/services/boarding.service";
import {
  getProfileService,
  listProfilesService,
} from "@/services/profile.service";
import {
  getRegistrationsService,
  sendInvitationService,
} from "@/services/registrations.service";
import {
  listVisaStatusService,
  reviewVisaService,
} from "@/services/visa.service";
import { HttpBadRequestError } from "@/types/http.errors";
import type { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";

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

export async function getProfiles(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for list profiles");
  try {
    const { message, data } = await listProfilesService();
    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for an employee's profile");
  try {
    const employeeId = req.params.id;
    if (
      !employeeId ||
      !isValidObjectId(employeeId) ||
      typeof employeeId !== "string"
    ) {
      throw new HttpBadRequestError("INVALID_EMPLOYEE_ID");
    }

    const { message, data } = await getProfileService(employeeId);
    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBoardings(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for list boardings");

  try {
    const state = req.query.state;

    if (
      state &&
      typeof state === "string" &&
      (state === "PENDING" || state === "REJECTED" || state === "APPROVED")
    ) {
      const { message, data } = await listBoardingService(state);
      res.status(200).json({
        success: true,
        message: message,
        data: data,
      });
    } else {
      const { message, data } = await listAllBoardingService();
      res.status(200).json({
        success: true,
        message: message,
        data: data,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function getBoarding(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for retrive an employee's boarding application");
  try {
    const employeeId = req.params.id;
    if (
      !employeeId ||
      !isValidObjectId(employeeId) ||
      typeof employeeId !== "string"
    ) {
      throw new HttpBadRequestError("INVALID_EMPLOYEE_ID");
    }

    const { message, data } = await getBoardingService(employeeId);
    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllVisas(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for all employee's visa");
  try {
    const { message, data } = await listVisaStatusService();
    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProgressVisas(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for all inpogress employee's visa");
  try {
    const { message, data } = await listVisaStatusService(true);
    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function reviewBoarding(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for review an employee's boarding application");
  try {
    if (!req.body) {
      throw new HttpBadRequestError("EMPTY_REQUEST_BODY");
    }

    // review
    await reviewBoardingService(req.body);

    // updated boarding application list
    const { message, data } = await listAllBoardingService();
    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function reviewVisa(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get request for review an employee's visa document");
  try {
    if (!req.body) {
      throw new HttpBadRequestError("EMPTY_REQUEST_BODY");
    }

    // review
    await reviewVisaService(req.body);

    // updated boarding application list
    const { data: all } = await listAllBoardingService();
    const { data: progress } = await listAllBoardingService(true);
    res.status(200).json({
      success: true,
      message: "You've reivewed the visa document",
      data: { all, progress },
    });
  } catch (error) {
    next(error);
  }
}

const adminController = {
  // registrations
  getRegistrations: getRegistrations,
  invitate: sendInvitation,

  // profiels
  getProfile: getProfile,
  getProfiles: getProfiles,

  // boardings
  getBoardings: getBoardings,
  getBoarding: getBoarding,
  reviewBoarding: reviewBoarding,

  // visas
  getAllVisas: getAllVisas,
  getProgressVisas: getProgressVisas,
  reviewVisa: reviewVisa,
};
export default adminController;
