import type { ApplyState } from "@/types/common";

export interface IWorkAuthorization {
  type: string; // "Green Card" |  "Citizen" | "H1-B" | "L2" | "H4" | "other" | "F1(CPT/OPT)"
  title?: string;
  startDate?: Date;
  endDate?: Date;
  url?: string;
}

export interface IOPTWorkAuthorization extends IWorkAuthorization {
  type: "F1(CPT/OPT)";
  startDate: Date;
  endDate: Date;
  url: string;
}

export interface IBoardingData {
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
    preferredName?: string;
  };

  profileImage: string; // link to a picture

  address: {
    street: string;
    state: string;
    city: string;
    zip: string;
    secondary: string;
  };

  cellPhone: string;
  workPhone?: string;
  email: string;
  SSN: string;
  dob: Date; // date of birth
  gender: string; // "male" | "female" | "NA"("I do not wish to answer")

  workAuthorization: IWorkAuthorization;

  reference: {
    person: {
      firstName: string;
      lastName: string;
      middleName?: string;
      phone?: string;
      email?: string;
    };
    relationship: string;
  };

  emergencyContacts: [
    {
      person: {
        firstName: string;
        lastName: string;
        middleName?: string;
        phone?: string;
        email?: string;
      };
      relationship: string;
    },
  ];
}

export interface IBoardingStatus {
  state: ApplyState; //"UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
  feedback?: string;
}
