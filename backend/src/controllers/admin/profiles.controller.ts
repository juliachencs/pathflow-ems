import {
  getProfileService,
  listProfilesService,
} from "@/services/profile.service";

import { HttpBadRequestError } from "@/types/http.errors";
import { isValidID } from "@/utils/utils";
import type { Request, Response, NextFunction } from "express";

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
    if (!employeeId || !isValidID(employeeId)) {
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
