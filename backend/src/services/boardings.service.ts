export async function listAllBoardingService() {
  const { data: pending } = await listBoardingService("PENDING");
  const { data: rejected } = await listBoardingService("REJECTED");
  const { data: approved } = await listBoardingService("APPROVED");

  return {
    message: "You've got all boarding applications",
    data: { pending, rejected, approved },
  };
}
export interface IReviewBoardingAction {
  employeeId: string;
  actionType: "APPROVE" | "REJECT";
  payload: {
    feedback?: string;
  };
}
export async function reviewBoardingService(
  employeeId: string,
  action: IReviewBoardingAction,
) {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }

  // update boarding state
  if (action.actionType === "APPROVE") {
    employee.boarding = {
      state: "APPROVED",
    };
  } else {
    employee.boarding = {
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

export async function listBoardingService(
  state: "PENDING" | "REJECTED" | "APPROVED",
) {
  const filter = { "boarding.state": state };
  const fields = [
    "_id",
    "data.name.firstName",
    "data.name.lastName",
    "data.email",
  ];
  const data = await Employee.find(filter, fields).lean().exec();
  const result = data.map((x) => {
    return {
      fullName: x.data.name.firstName + " " + x.data.name.lastName,
      email: x.data.email,
      employeeId: x._id,
    };
  });

  return {
    message: `You've got all employees whoes boarding application is ${state}`,
    data: result,
  };
}
