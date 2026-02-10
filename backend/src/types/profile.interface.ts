export interface IProfile {
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

  workAuthorization: {
    type: string; // "Green Card" |  "Citizen" | "H1-B" | "L2" | "H4" | "other" | "F1(CPT/OPT)"
    title?: string;
    startDate?: Date;
    endDate?: Date;
    url?: string;
  };

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

  visaDocuments?: {
    OPT?: URL;
    EAD?: URL;
    I983?: URL;
    I20?: URL;
  };
}

export interface IProfileFull extends IProfile {
  _id: string;
}

export interface IProfileSummary {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
    preferredName?: string;
  };
  cellPhone: string;
  email: string;
  SSN: string;
  workAuthorization: {
    type: string; // | "Green Card" |  "Citizen";
    title?: string;
    startDate?: Date;
    endDate?: Date;
    url?: string;
  };
}

export interface IProfileCore {
  _id: string;
  fullName: string;
  email: string;
}
