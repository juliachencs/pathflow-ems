import { isValidID } from "@/utils/utils";
import type { Request, Response, NextFunction } from "express";

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
    if (!isValidID(employeeId)) {
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

export async function reviewBoarding(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const employeeId = req.params.id;
  if (!isValidID(employeeId)) {
    throw new HttpBadRequestError("INVALID_EMPLOYEE_ID");
  }
  console.log(
    "Get request for review an employee's boarding application: ",
    employeeId,
  );

  try {
    if (!req.body) {
      throw new HttpBadRequestError("EMPTY_REQUEST_BODY");
    }

    // review
    await reviewBoardingService(employeeId, req.body);

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
