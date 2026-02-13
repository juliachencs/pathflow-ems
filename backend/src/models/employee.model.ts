import {
  WorkAuthTypes,
  type IBoardingData,
  type IBoardingStatus,
} from "@/types/boarding.interface";
import { ApplyStates } from "@/types/common";

import {
  VisaDocumentTypes,
  VisaStates,
  type IVisaStatus,
} from "@/types/visa.interface";
import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;

export interface IEmployee {
  _id: Types.ObjectId;
  data: IBoardingData;
  boarding: IBoardingStatus;
  visa: IVisaStatus;
}

const employeeSchema = new Schema<IEmployee>(
  {
    data: {
      name: {
        firstName: { type: String, required: true, default: "" },
        lastName: { type: String, required: true, default: "" },
        middleName: String,
        preferredName: String,
      },

      profileImage: { type: String, required: true, default: "" }, // URL

      address: {
        street: { type: String, required: true, default: "" },
        state: { type: String, required: true, default: "" },
        city: { type: String, required: true, default: "" },
        zip: { type: String, required: true, default: "" },
        secondary: String, // (Building xxx, APT XXX)
      },

      cellPhone: { type: String, required: true, default: "" },
      workPhone: String,
      email: {
        type: String,
        required: true,
        description: "the email received registration token",
      },
      SSN: { type: String, requried: true, default: "" },

      dob: {
        type: String,
        description: "Date of Birth",
        required: true,
        default: "2000-01-01T00:00:00.000Z",
      },

      gender: {
        type: String,
        description: "male|female|na",
        required: true,
        default: "na",
      },

      workAuthorization: {
        type: {
          type: String,
          enum: WorkAuthTypes,
          required: true,
          default: "Citizen",
        },
        title: String,
        startDate: String,
        endDate: String,
        url: String,
      },
      reference: {
        person: {
          firstName: { type: String, required: true, default: "" },
          lastName: { type: String, required: true, default: "" },
          middleName: String,
          phone: String,
          email: String,
        },
        relationship: { type: String, required: true, default: "" },
      },
      emergencyContacts: [
        {
          person: {
            firstName: { type: String, required: true, default: "" },
            lastName: { type: String, required: true, default: "" },
            middleName: String,
            phone: String,
            email: String,
          },
          relationship: { type: String, required: true, default: "" },
        },
      ],
    },

    boarding: {
      state: {
        type: String,
        enum: ApplyStates,
        required: true,
        default: "UNSUBMIT",
        index: true, // for fast query all employees upto its visa states
      },
      feedback: String,
    },

    visa: {
      state: {
        type: String,
        enum: VisaStates,
        required: true,
        default: "NA",
        index: true,
      }, // for fast query all employees upto its visa states
      curStage: { type: Number, enum: [0, 1, 2, 3, 4, 5], default: 0 }, //0: not started, 5: finished
      documents: {
        type: [
          {
            documentType: {
              type: String,
              enum: VisaDocumentTypes,
              required: true,
            },
            state: {
              type: String,
              enum: ApplyStates,
              required: true,
              default: "UNSUBMIT",
            },
            url: String,
            feedback: String,
          },
        ],
      },
    },
  },
  { minimize: false },
);
mongoose.Schema.Types.String.checkRequired((v: any) => typeof v === "string");
// Iterate over every path in the schema
// employeeSchema.eachPath((pathName, schemaType) => {
//   // Check if the field is a String and has the 'required' validator
//   if (
//     schemaType instanceof mongoose.Schema.Types.String &&
//     schemaType.isRequired
//   ) {
//     // Override checkRequired for this specific path only
//     // Returns true if value is a string (including ''), false if null/undefined
//     // schemaType.checkRequired((v) => typeof v === "string");
//     // Cast to 'any' or 'mongoose.Schema.Types.String' to satisfy TS
//     (schemaType as any).checkRequired((v: any) => typeof v === "string");
//   }
// });
export const Employee = model("Employee", employeeSchema, "employees");
