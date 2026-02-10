import {
  getProfileService,
  putProfileService,
} from "@/services/user/profile.service";
import type { AuthRequest } from "@/types/auth-request.interface";
import type { Response, NextFunction } from "express";

export async function controller_fn(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get Request:", req.originalUrl);
  try {
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

// | GET    | PROFILE      | USER  | /api/profile/me            | 获取员工的完整信息                                                                    |
// | PUT    | PROFILE      | USER  | /api/profile/me            | 更新员工的信息                                                                        |

//功能获取员工的完整信息
export async function getProfile(
  req: AuthRequest,
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

// 更新员工信息
export async function putProfile(
  req: AuthRequest,
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
