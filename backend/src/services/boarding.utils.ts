import type { IEmployee } from "@/models/employee.model";
import { initVisaStatus } from "@/services/visa.utils";
import type {
  IBoardingApplication,
  IBoardingData,
  IBoardingStatus,
} from "@/types/boarding.interface";
import type { ApplyState } from "@/types/common";
import { HttpNotFoundError } from "@/types/http.errors";

export function onBoarding(data: IBoardingData): Omit<IEmployee, "_id"> {
  return {
    data: data,
    boarding: { state: "PENDING" as ApplyState },
    visa: initVisaStatus(data.workAuthorization),
  };
}

export function extractBoardingApplication(
  employee: IEmployee,
): IBoardingApplication {
  const data: IBoardingData = employee.data;
  if (!data) {
    throw new HttpNotFoundError("GET_BOARDING_NOT_FOUND");
  }

  const status: IBoardingStatus = employee.boarding;
  if (!status) {
    throw new HttpNotFoundError("GET_BOARDING_NOT_FOUND");
  }

  const result: IBoardingApplication = {
    data,
    ...status,
  };
  return result;
}
