import type {
  IBoardingData,
  IName,
  IWorkAuthorization,
} from "@/types/boarding.interface";
import type { IVisaFiles } from "@/types/common";

export interface IProfile extends IBoardingData {
  files: IVisaFiles;
}
// interface for HR-Employee Profiles Page
export interface IProfileSummary {
  employeeId: string;
  fullName: string;
  name: IName;
  SSN: string;
  workAuthorization: IWorkAuthorization;
  cellPhone: string;
  email: string;
}

export interface IProfileCore {
  _id: string;
  fullName: string;
  email: string;
}
