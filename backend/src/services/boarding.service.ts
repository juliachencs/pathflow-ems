import { Employee } from "@/models/employee.model";
import { onBoarding } from "@/services/boarding.utils";
import { HttpNotFoundError } from "@/types/http.errors";

export async function getBoardingService(employeeId: string) {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }

  const result = employee.data;

  if (!result) {
    throw new HttpNotFoundError("GET_BOARDING_NOT_FOUND");
  }

  return {
    message: `You've got the boarding application of the ${employeeId}.`,
    data: result,
  };
}

export async function updateBoardingService(employeeId: string, data: unknown) {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }

  // make a new employee based on onBoarding data
  const info = onBoarding(data);

  employee.data = {...employee.data, ....info.data};
  employee.boarding = info.boarding;
  employee.visa = info.visa;

  // save the update
  await employee.save();

  return {
    message: `You've updated the boarding application of the ${employeeId}.`,
    data: employee.profileFull,
  };
}

export async function listBoardingService(state: "PENDING" | "REJECTED" | "APPROVED") {
  const filter = {"boarding.state": state};
  const fields = ["_id", "data.name.firstName", "data.name.lastName", "data.email"];
  const data = await Employee.find(filter, fields).lean().exec();
  const result = data.map((x)=>{
    return {
      fullName: x.data.name.firstName + " " + x.data.name.lastName,
      email: x.data.email,
      employeeId: x._id,
    }
  });

  return {
    message: `You've got all employees whoes boarding application is ${state}`,
    data: result,
  };

}
export interface IReviewBoardingAction {
  employeeId: string;
  actionType: "APPROVE"| "REJECT";
  payload:{
    feedback?: string;
  } 
}
export async function reviewBoardingService(action: IReviewBoardingAction) {
  const employeeId = action.employeeId;
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }


  // update boarding state
  if (action.actionType === "APPROVE") {
    employee.boarding ={
      state: "APPROVED", 
    } 
  } else {
    employee.boarding ={
      state: "REJECTED",
      feedback: action.payload.feedback, 
    };
  }

  // save the update
  await employee.save();

  return {
    message: `You've updated the boarding application of the ${employeeId}.`,
    data: employee.profileFull,
  };
}
