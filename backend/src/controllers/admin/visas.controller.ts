import {
  listVisaStatusService,
  reviewVisaService,
} from "@/services/visa.service";
import { HttpBadRequestError } from "@/types/http.errors";
import { isValidID } from "@/utils/utils";

import type { Request, Response, NextFunction } from "express";

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
    const employeeId = req.params.id;
    if (!employeeId || !isValidID(employeeId)) {
      throw new HttpBadRequestError("INVALID_EMPLOYEE_ID");
    }
    // review
    await reviewVisaService(employeeId, req.body);

    // updated boarding application list
    const { data: all } = await listVisaStatusService();
    const { data: progress } = await listVisaStatusService(true);
    res.status(200).json({
      success: true,
      message: "You've reivewed the visa document",
      data: { all, progress },
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
