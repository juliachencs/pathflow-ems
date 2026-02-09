import { Employee } from "@/models/employee";
import type { AuthRequest } from "@/types/auth-request.interface";
import type { Response, NextFunction } from "express";

export async function controller_fn(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  console.log("Get Request:", req.originalUrl);
}

// | GET    | PROFILE      | USER  | /api/profile/me            | 获取员工的完整信息                                                                    |
// | PUT    | PROFILE      | USER  | /api/profile/me            | 更新员工的信息                                                                        |
// | POST   | BOARDING     | USER  | /api/boarding/me           | submit boarding application                                                           |
// | PUT    | BOARDING     | USER  | /api/boarding/me           | re-submit boarding application                                                        |
// | GET    | BOARDING     | USER  | /api/boarding/me           | 获取员工的boarding application                                                        |
// | GET    | VISA         | USER  | /api/visa/me               | 获取员工的visa信息                                                                    |
// | PATCH  | VISA         | USER  | /api/visa/me               | 提交OPT/EAD/I983/I20文件链接                                                          |

//功能获取员工的完整信息
export async function getProfile(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function putProfile(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {}

const userController = {
  getProfile: getProfile,
  putProfile: putProfile,
};

export default userController;
