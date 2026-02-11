import { Registration } from "@/models/registration.model";
import { Account, type IAccount } from "@/models/account.model";
import { Employee, type IEmployee } from "@/models/employee.model";
import {
  HttpBadRequestError,
  HttpConfilctError,
  HttpNotFoundError,
  HttpServerError,
} from "@/types/http.errors";
import bcrypt from "bcrypt";
import { generateAccessToken, hashPassWord } from "@/utils/utils";
import type { IAuthPayload, IAuthData, Role } from "@/types/auth.interface";
import type { HydratedDocument } from "mongoose";
import type { ServiceReturnType } from "@/types/common";

export async function loginService(
  username: string,
  password: string,
): Promise<ServiceReturnType<IAuthData>> {
  // find the account
  const account = await Account.findOne({ username: username }).exec();
  if (!account) {
    throw new HttpNotFoundError("LOGIN_NOT_FOUND");
  }

  //  match the password
  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) {
    throw new HttpBadRequestError("LOGIN_UNMATCH");
  }

  // find the employee
  const employee: HydratedDocument<IEmployee> | null = await Employee.findById(
    account.employeeId,
  ).exec();
  if (!employee) {
    throw new HttpServerError("LOGIN_NOT_FOUND_EMPLOYEE");
  }

  const result = makeAuthRepsonse(employee, account);
  return {
    message: "You have successfully logged in!",
    data: result,
  };
}

export async function registerService(
  username: string,
  password: string,
  email: string,
  registerToken: string,
  role: Role = "USER",
): Promise<ServiceReturnType<IAuthData>> {
  // validate register Token
  const registration = await Registration.findOne({
    registerToken: registerToken,
  }).exec();

  if (!registration) {
    throw new HttpBadRequestError("REGISTER_TOKEN_NOT_FOUND");
  }

  const threeHoursInMs = 3 * 60 * 60 * 1000;
  if (registration.updatedAt.getTime() < Date.now() - threeHoursInMs) {
    throw new HttpBadRequestError("REGISTER_TOKEN_EXPIRED");
  }

  // validate the username
  const isExist = await Account.findOne({ username: username }).exec();
  if (isExist) {
    throw new HttpConfilctError("REGISTER_CONFLICT");
  }

  // create an employee with the prefilled email
  const employee = new Employee({
    data: { profileImage: "", email: registration.email },
  });
  await employee.save();

  // create an account
  const hashPW = await hashPassWord(password);
  const account: HydratedDocument<IAccount> = new Account({
    username: username,
    password: hashPW,
    email: email,
    role: role,
    employeeId: employee._id,
  });
  await account.save();

  // update the registeration information
  registration.employeeId = employee._id;
  registration.save();

  const result = makeAuthRepsonse(employee, account);

  return {
    message: "Congratulations! Your account has been successfully created!",
    data: result,
  };
}

function makeAuthRepsonse(
  employee: HydratedDocument<IEmployee>,
  account: HydratedDocument<IAccount>,
): IAuthData {
  // generate jwt token
  const payload: IAuthPayload = {
    role: account.role,
    accountId: account._id.toString(),
    employeeId: account.employeeId.toString(),
  };
  const token = generateAccessToken(payload);

  return {
    username: account.username,
    profileImage: employee.data.profileImage,
    employeeId: account.employeeId.toString(),
    accessToken: token,
    role: account.role,
    boarding: employee.boarding.state,
    visa: employee.visa.state,
  };
}
