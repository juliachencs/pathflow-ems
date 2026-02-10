import {
  getBoardingService,
  updateBoardingService,
} from "@/services/user/boarding.service";
import type { AuthRequest } from "@/types/auth-request.interface";
import type { IProfile } from "@/types/profile.interface";
import type { Response, NextFunction } from "express";

// GET /api/boarding/me
// 获取员工的boarding application
export async function getBoarding(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const employeeId = req.auth.empolyeeId;
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

// | POST   | BOARDING     | USER  | /api/boarding/me           | submit boarding application                                                           |
// | PUT    | BOARDING     | USER  | /api/boarding/me           | re-submit boarding application                                                        |
export async function updateboarding(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const employeeId = req.auth.empolyeeId;
    const profile: IProfile = req.body;
    const { message, data } = await updateBoardingService(employeeId, profile);
    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}
