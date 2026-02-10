import { Registration } from "@/models/registration.model";
import { Account } from "@/models/account.model";
import { Employee } from "@/models/employee.model";
import {
  HttpBadRequestError,
  HttpConfilctError,
  HttpNotFoundError,
  HttpServerError,
} from "@/types/http.errors";
import bcrypt from "bcrypt";
import { generateAccessToken, hashPassWord } from "@/utils/utils";
import type { IAuthPayload } from "@/types/auth-request.interface";

export async function loginService(username: string, password: string) {
  // find the account
  const account = await Account.findOne({ username: username }).exec();
  if (!account) {
    throw new HttpNotFoundError("LOGIN_NOT_FOUND");
  }

  //  check password
  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) {
    throw new HttpBadRequestError("LOGIN_UNMATCH");
  }

  // find the employee
  const profile = await Employee.findById(account.employeeId).exec();
  if (!profile) {
    throw new HttpServerError("LOGIN_NOT_FOUND_EMPLOYEE");
  }

  const info = profile.info;
  console.log(info);

  const payload: IAuthPayload = {
    role: account.role,
    accountId: account._id.toString(),
    empolyeeId: account.employeeId.toString(),
  };

  const accessToken = generateAccessToken(payload);

  return {
    username: username,
    role: account.role,
    accessToken: accessToken,
    ...info,
  };
}

export async function registerService(
  username: string,
  password: string,
  email: string,
  registerToken: string,
) {
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

  // create an employee with the email
  const employee = new Employee({ profile: { email: registration.email } });
  await employee.save();

  // create an account
  const hashPW = await hashPassWord(password);
  const account = new Account({
    username: username,
    password: hashPW,
    email: email,
    employeeId: employee._id,
  });
  await account.save();

  // update the registeration information
  registration.employeeId = employee._id;
  registration.save();

  // generate jwt token
  const payload = {
    role: account.role,
    accountId: account._id.toString(),
    empolyeeId: account.employeeId.toString(),
  };
  const token = generateAccessToken(payload);

  return {
    username: username,
    role: account.role,
    accessToken: token,
    ...employee.info,
  };
}
