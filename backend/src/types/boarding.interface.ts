import type { ApplyState } from "@/types/common";

// work authorization type
export const WorkAuthTypes = [
  "Green Card",
  "F1(CPT/OPT)",
  "Other",
  "Citizen",
  "H1-B",
  "L2",
  "H4",
  "Other",
] as const;

export type WorkAuthType = (typeof WorkAuthTypes)[number];

export interface IWorkAuthorization {
  type: string; // "Green Card" |  "Citizen" | "H1-B" | "L2" | "H4" | "other" | "F1(CPT/OPT)"
  title?: string;
  startDate?: string;
  endDate?: string;
  url?: string;
}

export interface IOPTWorkAuthorization extends IWorkAuthorization {
  type: "F1(CPT/OPT)";
  startDate: string;
  endDate: string;
  url: string;
}

export interface IName {
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
}

export interface IAddress {
  street: string;
  state: string;
  city: string;
  zip: string;
  secondary: string;
}

export interface IPerson {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  email?: string;
}

export interface IBoardingData {
  name: IName;
  profileImage: string; // link to a picture
  address: IAddress;
  cellPhone: string;
  workPhone?: string;
  email: string;
  SSN: string;
  dob: string; // date of birth
  gender: string; // "male" | "female" | "NA"("I do not wish to answer")

  workAuthorization: IWorkAuthorization;

  reference: {
    person: IPerson;
    relationship: string;
  };

  emergencyContacts: [
    {
      person: IPerson;
      relationship: string;
    },
  ];
}

export interface IBoardingStatus {
  state: ApplyState; //"UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
  feedback?: string;
}

export interface IBoardingApplication {
  state: "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
  feedback?: string;
  data: IBoardingData;
}

//
export interface IReviewBoardingAction {
  actionType: "APPROVE" | "REJECT";
  payload: {
    feedback?: string;
  };
}
