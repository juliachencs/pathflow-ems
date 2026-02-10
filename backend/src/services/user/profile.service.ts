import { Employee } from "@/models/employee";
import type { IProfile } from "@/types/profile.interface";
import { HttpNotFoundError } from "@/types/http.errors";

export async function getProfileService(employeeId: string) {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("GET_PROFILE_NOT_FOUND");
  }
  return {
    message: `You've got the profile of ${employeeId}.`,
    data: employee.profileFull,
  };
}

export async function putProfileService(employeeId: string, profile: IProfile) {
  const employee = await Employee.findByIdAndUpdate(
    employeeId,
    { profile: profile },
    {
      new: true,
    },
  ).exec();

  if (!employee) {
    throw new HttpNotFoundError("PUT_PROFILE_NOT_FOUND");
  }

  return {
    message: `The profile of ${employeeId} has been updated.`,
    data: employee.profileFull,
  };
}
