import {
  getProfileService,
  putProfileService,
} from "@/services/user/profile.service";
import type { IAuthRequest } from "@/types/auth-request.interface";
import type { Response, NextFunction } from "express";

// GET api/profile/me
//功能获取员工的完整信息
export async function getProfile(
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const employeeID = req.auth.empolyeeId;
    const { message, data } = await getProfileService(employeeID);

    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

// PUT  | /api/profile/me
// 更新员工信息
export async function putProfile(
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const employeeID = req.auth.empolyeeId;
    const profile = req.body;

    // TODO: add some preprocessing
    const { message, data } = await putProfileService(employeeID, profile);

    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  } catch (error) {
    next(error);
  }
}
