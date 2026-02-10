export type UserRole = "USER" | "ADMIN";
export type BoardingStatus = "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
export type FileStatus = "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
export type VisaStatus = "PROGRESS" | "FINISHED" | "NR" | "NA";
export type VisaType = "Citizen" | "GreenCard" | "H1-B" | "L2" | "H4" | "Other" | "F1"
export type Gender = "male" | "female" | "other"
export type DocType = "OPT" | "EAD" | "I983" | "I20"
export type ActionType =  "APPROVE" | "REJECT" | "SEND_NOTIFICATION" | "SUBMIT"

export interface KnownError {
  message: string;
  description: string;
  code: number;
}

export interface IBoardingApplication {
  _id: string; // employee id
  state: BoardingStatus;
  profile: IProfileFull;
  feedback?: string;
}

export interface ContactInfo {
  person: {
    firstName?: string | undefined;
    lastName?: string | undefined;
    middleName?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
  },
  relationship?: string;
}
export interface IProfileFull {
  _id?: string;

  name: {
    firstName: string;
    lastName: string;
    middleName: string | undefined;
    preferredName: string | undefined;
  };

  profileImage: string | undefined; // link to a picture

  address: {
    street: string;
    state: string;
    city: string;
    zip: string;
    secondary: string | undefined,
  };

  cellPhone: string;
  workPhone: string | undefined;
  email: string;
  SSN: string;
  dob: Date;
  gender: Gender;

  workAuthorization: {
    type: VisaType;
    title: string | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    url: string | undefined;
  };

  reference?: ContactInfo;

  emergencyContacts?: ContactInfo[];

  visaDocuments?: {
    OPT: string | undefined;
    EAD: string | undefined;
    I983: string | undefined;
    I20: string | undefined;
  }
}

export interface IVisaStatus {
  _id: string; // employeeID
  state: VisaStatus;
  curState: number;
  documents: [
    { OPT: { state: FileStatus, feedback?: string, url?: URL } },
    { EAD: { state: FileStatus, feedback?: string, url?: URL } },
    { I983: { state: FileStatus, feedback?: string, url?: URL } },
    { I20: { state: FileStatus, feedback?: string, url?: URL } },
  ]
}