import { Employee, type IEmployee } from "@/models/employee.model";
import { onBoarding } from "@/services/boarding.utils";
import type {
  IBoardingApplication,
  IBoardingData,
  IBoardingStatus,
} from "@/types/boarding.interface";
import type { ServiceReturnType } from "@/types/common";
import { HttpNotFoundError } from "@/types/http.errors";

export async function getBoardingApplicationService(
  employeeId: string,
): ServiceReturnType<IBoardingApplication> {
  const employee: IEmployee | null = await Employee.findById(employeeId)
    .lean()
    .exec();

  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }

  const result: IBoardingApplication = extractBoardingApplication(employee);

  return {
    message: `You've got the boarding application of the ${employeeId}.`,
    data: result,
  };
}

export async function submitBoardingService(
  employeeId: string,
  data: IBoardingData,
): ServiceReturnType<IBoardingApplication> {
  // make a new employee based on onBoarding data
  const fulldata = onBoarding(data);
  // const flatData = flattenObject(fulldata);
  // console.log(flatData);

  const employee = await Employee.findByIdAndUpdate(
    employeeId,
    { ...fulldata },
    { new: true },
  ).exec();
  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }

  return {
    message: `You've submit the boarding application.`,
    data: employee.data,
  };
}

function extractBoardingApplication(employee: IEmployee): IBoardingApplication {
  const data: IBoardingData = employee.data;
  if (!data) {
    throw new HttpNotFoundError("GET_BOARDING_NOT_FOUND");
  }

  const status: IBoardingStatus = employee.boarding;
  if (!status) {
    throw new HttpNotFoundError("GET_BOARDING_NOT_FOUND");
  }

  const result: IBoardingApplication = {
    data,
    ...status,
  };
  return result;
}
// export async function updateBoardingDataService(employeeId: string, data: IBoardingData) {
//   const employee = await Employee.findById(employeeId).exec();
//   if (!employee) {
//     throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
//   }

//   // make a new employee based on onBoarding data
//   const info = onBoarding(data);

//   employee.data = {...employee.data, ....info.data};
//   employee.boarding = info.boarding;
//   employee.visa = info.visa;

//   // save the update
//   await employee.save();

//   // make sure the
//   return {
//     message: `You've updated the boarding application of the ${employeeId}.`,
//     data: employee.data,
//   };
// }
