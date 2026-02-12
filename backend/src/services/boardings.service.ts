import { Employee } from "@/models/employee.model";
import type {
  IBoardingStatus,
  IReviewBoardingAction,
} from "@/types/boarding.interface";
import type { ServiceReturnType } from "@/types/common";
import { HttpNotFoundError } from "@/types/http.errors";
import type { IProfileCore } from "@/types/profile.interface";

export async function listAllBoardingService(): ServiceReturnType<{
  PENDING: IProfileCore[];
  REJECTED: IProfileCore[];
  APPROVED: IProfileCore[];
}> {
  const { data: PENDING } = await listBoardingService("PENDING");
  const { data: REJECTED } = await listBoardingService("REJECTED");
  const { data: APPROVED } = await listBoardingService("APPROVED");

  return {
    message: "You've got all boarding applications",
    data: { PENDING, REJECTED, APPROVED },
  };
}

export async function listBoardingService(
  state: "PENDING" | "REJECTED" | "APPROVED",
): ServiceReturnType<IProfileCore[]> {
  const filter = { "boarding.state": state };
  const fields = ["_id", "data.name", "data.email"];
  const data = await Employee.find(filter, fields).lean().exec();
  const result = data.map((x) => {
    console.log(x);
    return {
      fullName: x.data.name.firstName + " " + x.data.name.lastName,
      name: x.data.name,
      email: x.data.email,
      employeeId: x._id.toString(),
    };
  });

  return {
    message: `You've got all employees whoes boarding application is ${state}`,
    data: result,
  };
}

function updatedStatus(action: IReviewBoardingAction) {
  if (action.actionType === "APPROVE") {
    return {
      "boarding.state": "APPROVED",
    };
  } else {
    return {
      "boarding.state": "REJECTED",
      "boarding.feedback": action.payload.feedback,
    };
  }
}

export async function reviewBoardingService(
  employeeId: string,
  action: IReviewBoardingAction,
): ServiceReturnType<IBoardingStatus> {
  const update = updatedStatus(action);

  const employee = await Employee.findByIdAndUpdate(employeeId, update, {
    new: true,
  })
    .lean()
    .exec();
  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }
  console.group("review boarding application");
  console.log("action", action);
  console.log("updated employee:", employee);
  return {
    message: `The boarding application of the ${employeeId} has been updated.`,
    data: employee.boarding,
  };
}
