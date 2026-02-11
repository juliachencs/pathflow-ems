import { initVisaStatus } from "@/services/visa.utils";
import type { IBoardingData } from "@/types/boarding.interface";
import type { ApplyState } from "@/types/common";
import type { IEmployee } from "@/types/employee.interface";

export function onBoarding(data: IBoardingData): Omit<IEmployee, "_id"> {
  return {
    data: data,
    boarding: { state: "PENDING" as ApplyState },
    visa: initVisaStatus(data.workAuthorization),
  };
}
