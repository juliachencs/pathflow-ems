import type { IBoardingData } from "@/types/boarding.interface";
import type { IVisaFiles } from "@/types/common";

export interface IProfile extends IBoardingData {
  files: IVisaFiles;
}

export interface IProfileFull extends IProfile {
  _id: string;
}

export type IProfileSummary = Pick<
  IProfileFull,
  "_id" | "name" | "cellPhone" | "email" | "SSN" | "workAuthorization"
>;

export interface IProfileCore {
  _id: string;
  fullName: string;
  email: string;
}
