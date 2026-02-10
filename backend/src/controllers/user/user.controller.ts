import {
  getBoardingService,
  updateBoardingService,
} from "@/services/user/boarding.service";
import {
  getProfileService,
  updateProfileService,
} from "@/services/user/profile.service";
import {
  getVisaService,
  submitVisaDocumentService,
} from "@/services/user/visa.service";

import type { IAuthRequest } from "@/types/auth-request.interface";
import type { Response, NextFunction } from "express";

type QueryFunc<T> = (id: string) => Promise<{ message: string; data: T }>;

function queryController<T = unknown>(query_fn: QueryFunc<T>) {
  return async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.auth.empolyeeId;
      const { message, data } = await query_fn(employeeId);

      res.status(200).json({
        success: true,
        message: message,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };
}

type MutationFunc<TInput, TOutput> = (
  id: string,
  payload: TInput,
) => Promise<{ message: string; data: TOutput }>;
function mutationController<T = unknown, U = unknown>(
  mutation_fn: MutationFunc<T, U>,
) {
  return async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.auth.empolyeeId;
      const payload = req.body;
      const { message, data } = await mutation_fn(employeeId, payload);

      res.status(200).json({
        success: true,
        message: message,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };
}

const userController = {
  getProfile: queryController(getProfileService),
  getBoarding: queryController(getBoardingService),
  getVisaStaus: queryController(getVisaService),

  updateProfile: mutationController(updateProfileService),
  updateBoarding: mutationController(updateBoardingService),
  submitVisaDocument: mutationController(submitVisaDocumentService),
};

export default userController;
