import { initVisaStatus } from "@/services/visa.utils";
import type { ApplyState } from "@/types/common";

export function onBoarding(data) {
  return {
    data: data,
    boarding: { state: "PENDING" as ApplyState },
    visa: initVisaStatus(data.workAuthorization),
  };
}
