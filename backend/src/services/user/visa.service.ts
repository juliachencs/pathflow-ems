import { Employee } from "@/models/employee";
import type { VisaDocumentType } from "@/types/common";
import { HttpNotFoundError } from "@/types/http.errors";
import type {
  ISubmitDocumentAction,
  IVisaStatus,
} from "@/types/visa.interface";

//
export async function getVisaService(
  employeeId: string,
): Promise<{ message: string; data: IVisaStatus }> {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw new HttpNotFoundError("GET_BOARDING_NOT_FOUND");
  }
  const result = employee.visa;
  // null or undefined
  if (!result) {
  }

  return {
    message: `You've got the visa status of the ${employeeId}.`,
    data: result,
  };
}

export async function submitVisaDocumentService(
  employeeId: string,
  action: ISubmitDocumentAction,
): Promise<{ message: string; data: IVisaStatus }>;

export async function submitVisaDocumentService(employeeId, action) {}
