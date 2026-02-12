import { Employee, type IEmployee } from "@/models/employee.model";
import { collectFiles } from "@/services/visa.utils";
import type { ServiceReturnType } from "@/types/common";
import { HttpNotFoundError } from "@/types/http.errors";
import type { IProfile, IProfileSummary } from "@/types/profile.interface";
import { flattenObject } from "@/utils/utils";
import type { HydratedDocument } from "mongoose";

export async function getProfileService(employeeId: string) {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }
  return {
    message: `You've got the profile of ${employeeId}.`,
    data: makeProfile(employee),
  };
}

export async function updateProfileService(employeeId: string, profile: any) {
  // filter out unused field
  const flatData = flattenObject({ data: profile });
  console.log(flatData);
  const employee = await Employee.findByIdAndUpdate(
    employeeId,
    {
      $set: flatData,
    },
    { new: true },
  ).exec();

  if (!employee) {
    throw new HttpNotFoundError("UPDATE_PROFILE_NOT_FOUND");
  }
  return {
    message: `The profile of ${employeeId} has been updated.`,
    data: makeProfile(employee),
  };
}

function makeProfile(employee: HydratedDocument<IEmployee>): IProfile {
  const files = collectFiles(employee.visa);
  const profile = {
    ...employee.data,
    files,
  };
  return profile;
}

export async function listProfilesService(): ServiceReturnType<
  IProfileSummary[]
> {
  const fields = [
    "_id",
    "data.name.firstName",
    "data.name.lastName",
    "data.SSN",
    "data.email",
    "data.cellPhone",
    "data.workAuthorization",
  ];

  const data = await Employee.find({}, fields).lean().exec();

  const results = data.map((x) => {
    return {
      employeeId: x._id.toString(),
      fullName: x.data.name.firstName + " " + x.data.name.lastName,
      name: x.data.name,
      SSN: x.data.SSN,
      email: x.data.email,
      cellPhone: x.data.cellPhone,
      workAuthorization: x.data.workAuthorization,
    };
  });

  return { message: "You've got all employees' profiles!", data: results };
}
