import { Employee } from "@/models/employee.model";
import {
  collectFiles,
  isLegalAction,
  isLegalStatus,
  transit,
  nextVisaStep,
} from "@/services/visa.utils";
import type { IEmployee } from "@/types/employee.interface";

import {
  HttpBadRequestError,
  HttpNotFoundError,
  HttpServerError,
} from "@/types/http.errors";
import type {
  IManagedVisaStatus,
  IReviewVisaAction,
} from "@/types/visa.interface";

import type {
  ISubmitDocumentAction,
  IVisaStatus,
} from "@/types/visa.interface";

//
export async function getVisaService(employeeId: string) {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }

  const result = employee.visa;

  // null or undefined
  if (!result) {
    throw new HttpNotFoundError("GET_VISA_NOT_FOUND");
  }

  return {
    message: `You've got the visa status of the ${employeeId}.`,
    data: result,
  };
}

export async function submitVisaDocumentService(
  employeeId: string,
  action: ISubmitDocumentAction,
): Promise<{ message: string; data: IVisaStatus }> {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }
  const cur = employee.visa;
  // check if state is legal
  if (!isLegalStatus(cur)) {
    throw new HttpServerError("ILLEGAL_VISA_STATUS");
  }

  // check if action is legal
  if (!isLegalAction(cur, action)) {
    throw new HttpBadRequestError("ILLEGAL_VISA_SUBMIT");
  }

  employee.visa = transit(cur, action);
  await employee.save();

  return {
    message: "You have successfully submit " + action.payload.documentType,
    data: employee.visa,
  };
}

export async function reviewVisaService(
  employeeId: string,
  action: IReviewVisaAction,
) {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("NOT_FOUND_EMPLOYEE");
  }

  const cur: IVisaStatus = employee.visa;
  // check if state is legal
  if (!isLegalStatus(cur)) {
    throw new HttpServerError("ILLEGAL_VISA_STATUS");
  }

  // check if action is legal
  if (!isLegalAction(cur, action)) {
    throw new HttpBadRequestError("ILLEGAL_VISA_SUBMIT");
  }

  if (action.actionType === "SEND_NOTIFICATION") {
    //TODO: send notification
    const email = employee.data?.email;
    return {
      message: `We have email ${email} to request ${action.payload.documentType}`,
      data: employee.visa,
    };
  }

  // else reject/approve an document
  employee.visa = transit(cur, action);
  await employee.save();

  return {
    message: "The visa status has been updated",
    data: employee.visa,
  };
}

export async function listVisaStatusService(
  inprogress: boolean = false,
): Promise<{ message: string; data: IManagedVisaStatus[] }> {
  const filter = inprogress
    ? { "visa.state": "PROGRESS" }
    : { "visa.state": { $in: ["PROGRESS", "FINISHED"] } };

  const feilds = ["_id", "data.name", "data.workAuthorization", "visa"];

  const data = await Employee.find(filter, feilds).lean().exec();
  const result: IManagedVisaStatus[] = data.map((x) => {
    return {
      employeeId: x._id.toString(),
      name: x.data.name,
      workAuthorization: {
        title: x.data.workAuthorization.title || x.data.workAuthorization.type,
        startDate: x.data.workAuthorization.startDate || new Date(),
        endDate: x.data.workAuthorization.endDate || new Date(),
      },
      files: collectFiles(x.visa),
      ...nextVisaStep(x.visa),
    };
  });

  return {
    message: inprogress
      ? "You've got all OPT employees with visa documents in uploading"
      : "You've got all OPT employees' visa status",
    data: result,
  };
}
