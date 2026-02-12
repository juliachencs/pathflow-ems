import {
  getBoardingApplicationService,
  submitBoardingService,
} from "@/services/boarding.service";
import {
  getProfileService,
  updateProfileService,
} from "@/services/profile.service";
import {
  getVisaService,
  submitVisaDocumentService,
} from "@/services/visa.service";
import { HttpUnauthorizedError } from "@/types/http.errors";
import type {
  ISubmitDocumentAction,
  IVisaStatus,
} from "@/types/visa.interface";

import { isValidID } from "@/utils/utils";
import type { Request, Response, NextFunction } from "express";

type QueryFunc<T> = (id: string) => Promise<{ message: string; data: T }>;

function queryController<T = unknown>(query_fn: QueryFunc<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.auth);
      if (!req.auth || !isValidID(req.auth.employeeId)) {
        throw new HttpUnauthorizedError("AUTHORIZE_MISS_ID");
      }

      const employeeId = req.auth.employeeId;
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
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.auth || !isValidID(req.auth.employeeId)) {
        throw new HttpUnauthorizedError("AUTHORIZE_MISS_ID");
      }

      const employeeId = req.auth.employeeId;
      const payload = req.body as T;
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
  getBoarding: queryController(getBoardingApplicationService),
  getVisaStaus: queryController(getVisaService),

  updateProfile: mutationController(updateProfileService),
  submitBoarding: mutationController(submitBoardingService),
  submitVisaDocument: mutationController<ISubmitDocumentAction, IVisaStatus>(
    submitVisaDocumentService,
  ),
};

export default userController;
