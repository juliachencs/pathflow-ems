import {
  INIT_BOARDING_DATA,
  type IBoardingData,
  type IBoardingStatus,
  type IWorkAuthorization,
} from "@/types/boarding.interface";
import { ApplyStates, WorkAuthTypes } from "@/types/common";
import type { IEmployee } from "@/types/employee.interface";
import {
  VisaStates,
  type IDocumentState,
  type IVisaStatus,
} from "@/types/visa.interface";
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

const workAuthorizationSchema = new Schema<IWorkAuthorization>(
  {
    type: { type: String, enum: WorkAuthTypes, required: true },
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

const dataSchema = new Schema<IBoardingData>(
  {
    name: nameSchema,
    profileImage: { type: String, required: true, default: () => "" }, // URL
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
  },
  { _id: false }, // <-- disable `_id`
);
const boardingSchema = new Schema<IBoardingStatus>(
  {
    state: {
      type: String,
      enum: ApplyStates,
      required: true,
      default: "UNSUBMIT",
      index: true, // for fast query all employees upto its visa states
    },
    feedback: String,
  },
  { _id: false }, // <-- disable `_id`
);

const stateSchema = new Schema<IDocumentState>(
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

const visaSchema = new Schema<IVisaStatus>(
  {
    state: {
      type: String,
      enum: VisaStates,
      required: true,
      default: "NA",
      index: true,
    }, // for fast query all employees upto its visa states
    curStage: { type: Number, enum: [0, 1, 2, 3, 4], default: 0 },
    documents: {
      type: [
        { OPT: stateSchema },
        { EAD: stateSchema },
        { I983: stateSchema },
        { I20: stateSchema },
      ],
    },
  },
  { _id: false }, // <-- disable `_id`
);

const employeeSchema = new Schema(
  {
    data: {
      type: dataSchema,
      required: true,
    },
    boarding: {
      type: boardingSchema,
      required: true,
      default: () => ({
        state: "UNSUBMIT",
      }),
    },
    visa: {
      type: visaSchema,
      required: true,
      default: () => ({
        state: "NA",
      }),
    },
  },
  {
    virtuals: {
      info: {
        get() {
          return {
            employeeId: this._id.toString(),
            boarding: this.boarding.state,
            visa: this.visa.state,
            profileImage: this.data.profileImage,
          };
        },
      },
    }, // end virtuals
  },
);

export const Employee = model("Employee", employeeSchema, "employees");
