import type { IBoardingData } from "@/types/boarding.interface";

export interface IProfile extends IBoardingData {
  visaDocuments?: {
    OPT?: string;
    EAD?: string;
    I983?: string;
    I20?: string;
  };
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
