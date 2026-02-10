import { Employee } from "@/models/employee";
import { HttpNotFoundError } from "@/types/http.errors";
import type { IProfile } from "@/types/profile.interface";

export async function getBoardingService(
  employeeId: string,
): Promise<{ message: string; data: IBoardingApplication }> {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("GET_BOARDING_NOT_FOUND");
  }
  const result = employee.boardingApplication;

  return {
    message: `You've got the boarding application of the ${employeeId}.`,
    data: result,
  };
}

export async function updateBoardingService(
  employeeId: string,
  profile: IProfile,
): Promise<{ message: string; data: IBoardingApplication }> {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("SUBMIT_BOARDING_NOT_FOUND");
  }

  // update the profile
  employee.profile = profile;

  // update the boarding application state to pending
  employee.boarding = {
    state: "PENDING",
  };

  // update the visa status
  if (profile.workAuthorization.type === "F1(CPT/OPT)") {
    if (profile.workAuthorization.url) {
      employee.profile.visaDocuments = { OPT: profile.workAuthorization.url };
    }
  } else {
    // update the visa stauts to NR
    employee.profile.visaDocuments = {};
    employee.visa = {
      state: "NR",
    };
  }
  // save the update
  await employee.save();

  return {
    message: `You've updated the boarding application of the ${employeeId}.`,
    data: employee.boardingApplication,
  };
}
