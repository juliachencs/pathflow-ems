import { Employee } from "@/models/employee.model";
import { HttpNotFoundError } from "@/types/http.errors";

export async function getProfileService(employeeId: string) {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }
  return {
    message: `You've got the profile of ${employeeId}.`,
    data: employee.profileFull,
  };
}

export async function updateProfileService(
  employeeId: string,
  profile: object,
) {
  const employee = await Employee.findById(employeeId).exec();

  if (!employee) {
    throw new HttpNotFoundError("UPDATE_PROFILE_NOT_FOUND");
  }

  // update profile here
  employee.data = { ...employee.data, ...profile };
  await employee.save();

  return {
    message: `The profile of ${employeeId} has been updated.`,
    data: employee.profileFull,
  };
}

export async function listProfilesService() {
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
      employeeId: x._id,
      fullName: x.data.name.firstName + " " + x.data.name.lastName,
      SSN: x.data.SSN,
      email: x.data.email,
      cellPhone: x.data.cellPhone,
      workAuthTile:
        x.data.workAuthorization.title || x.data.workAuthorization.type,
    };
  });

  return { message: "You've got all employees' profiles!", data: results };
}
