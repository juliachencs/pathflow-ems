import type {
  IBoardingData,
  IBoardingStatus,
} from "@/types/boarding.interface";
import type { IVisaStatus } from "@/types/visa.interface";

export interface IEmployee {
  _id: string;
  data: IBoardingData;
  boarding: IBoardingStatus;
  visa: IVisaStatus;
}
