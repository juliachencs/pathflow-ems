import type { IBoardingApplication } from "@/types/boarding.interface";
import { ApplyStates, VisaStates, WorkAuthTypes } from "@/types/common";
import { EamilError } from "@/types/email.errors";
import type { IProfile, IProfileFull } from "@/types/profile.interface";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const nameSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: String,
    preferredName: String,
  },
  { _id: false }, // <-- disable `_id`
);

// https://www.apartmentlist.com/renter-life/apartment-address-format
const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    secondary: String, // (Building xxx, APT XXX)
  },
  { _id: false }, // <-- disable `_id`
);

const personSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: String,
    phone: String,
    email: String,
  },
  { _id: false }, // <-- disable `_id`
);

const workAuthorizationSchema = new Schema(
  {
    title: {
      type: { type: String },
      enum: WorkAuthTypes,
      required: true,
    },
    startDate: Date,
    endDate: Date,
    url: { type: String },
  },
  { _id: false }, // <-- disable `_id`
);

const profileSchema = new Schema<IProfile>(
  {
    name: nameSchema,
    profileImage: String, // URL
    address: addressSchema,
    cellPhone: { type: String, required: true },
    workPhone: String,
    email: {
      type: String,
      required: true,
      description: "the email received registration token",
    },
    SSN: { type: String, requried: true },
    dob: { type: Date, description: "Date of Birth", required: true },
    gender: { type: String, description: "male|female|na", required: true },
    workAuthorization: workAuthorizationSchema,
    reference: {
      person: personSchema,
      relationship: { type: String, required: true },
    },
    emergencyContacts: [
      { person: personSchema, relationship: { type: String, required: true } },
    ],

    visaDocuments: {
      OPT: String,
      EAD: String,
      I983: String,
      I20: String,
    },
  },
  { _id: false }, // <-- disable `_id`
);

const stateSchema = new Schema(
  {
    state: {
      type: String,
      enum: ApplyStates,
      required: true,
      default: "UNSUBMIT",
    },
    url: String,
    feedback: String,
  },
  { _id: false }, // <-- disable `_id`
);

const employeeSchema = new Schema(
  {
    profile: profileSchema,
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
      curStage: { type: Number, enum: [0, 1, 2, 3, 4], default: 0 },
      documents: [
        { OPT: stateSchema },
        { EAD: stateSchema },
        { I983: stateSchema },
        { I20: stateSchema },
      ],
    },
  },
  {
    virtuals: {
      info: {
        get() {
          return {
            _id: this._id,
            profileImage: this.profile?.profileImage,
            boarding: this.boarding?.state,
            visa: this.visa?.state,
          };
        },
      },

      profileFull: {
        get() {
          return { _id: this._id, ...this.profile };
        },
      },

      boardingApplication: {
        get(): IBoardingApplication {
          const boarding = {
            state: "UNSUMBIT",
            feedback: null,
            ...this.boarding,
          };

          return {
            ...boarding,
            _id: this._id,
            profile: this.profile as IProfile,
          };
        },
      },
    }, // end virtuals
  },
);

export const Employee = model("Employee", employeeSchema, "employees");
