export type UserRole = "USER" | "ADMIN";
export type BoardingStatus = "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
export type FileStatus = "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
export type VisaStatus = "PROGRESS" | "FINISHED" | "NR" | "NA";
export type VisaType = "Citizen" | "Green Card" | "H1-B" | "L2" | "H4" | "Other" | "F1(CPT/OPT)"
export type Gender = "male" | "female" | "NA"
export type DocType = "OPT" | "EAD" | "I983" | "I20"
export type ActionType = "APPROVE" | "REJECT" | "SEND_NOTIFICATION" | "SUBMIT"

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

export interface NamePacked {
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
}

export interface WorkAuth {
  type: VisaType;
  title: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  url: string | undefined;
}

export interface VisaDocuments {
  OPT: string | undefined;
  EAD: string | undefined;
  I983: string | undefined;
  I20: string | undefined;
}
export interface IProfileFull {
  _id?: string;

  name: NamePacked;

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

  workAuthorization: WorkAuth;

  reference?: ContactInfo;

  emergencyContacts?: ContactInfo[];

  visaDocuments?: VisaDocuments;
}

export interface IProfileSummary {
  employeeId: string;

  name: NamePacked;
  SSN: string;
  workAuthorization: WorkAuth;
  cellPhone: string;
  email: string;
}

export interface IProfileCore {
  employeeId: string;
  fullName: string;
  email: string;
}

export interface IVisaDoc {
  _id: string;
  state: FileStatus;
  documentType: DocType;
}

export interface IVisaStatus {
  state: VisaStatus;
  curStage: number;
  documents: IVisaDoc[]
}

export interface IVisaAction {
  actionType: "REVIEW" | "SEND_NOTIFICATION";
  payload: {
    documentType: DocType;
    url?: string;
  };
}

export interface IVisaWorkAuth {
  title: string;
  startDate: string;
  endDate: string;
}

export interface IManagedVisaStatus {
  employeeId: string;
  name: NamePacked;
  workAuthorization: IVisaWorkAuth;
  nextStep: string;
  action: IVisaAction | undefined;

  files: IVisaFiles;
}

// TODO Merge two visa files
export interface IVisaFiles {
  OPT?: string;
  EAD?: string;
  I983?: string;
  I20?: string;
}

export interface IBoardingReviewAction {
  actionType: "APPROVE" | "REJECT";
  payload: {
    feedback?: string;
  }
}

export interface registerLogInfo {
  name: string;
  email: string;
  registrationLink: string;
  hasRegistered: boolean; // indicate if this link has been used to register an account
  hasApplied: boolean; // indicate this email has been submitted in an onboarding application.
}

export interface BoardingData {
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
  dob: string; // date of birth
  gender: Gender; // "male" | "female" | "NA"("I do not wish to answer")

  workAuthorization: {
    type: VisaType; // "Green Card" |  "Citizen" | "H1-B" | "L2" | "H4" | "other" | "F1(CPT/OPT)"
    title?: string;
    startDate?: string;
    endDate?: string;
    url?: string;
  };

  reference: {
    person?: {
      firstName: string;
      lastName: string;
      middleName?: string;
      phone?: string;
      email?: string;
    };
    relationship?: string;
  };

  emergencyContacts?: 
    {
      person: {
        firstName: string;
        lastName: string;
        middleName?: string;
        phone?: string;
        email?: string;
      };
      relationship: string;
    }[];
}

export interface IProfile extends BoardingData {
  files: IVisaFiles
}