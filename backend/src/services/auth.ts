import { Registration } from "@/models/registration";
import { Account } from "@/models/account";
import { Employee } from "@/models/employee";
import {
  HttpBadRequestError,
  HttpConfilctError,
  HttpNotFoundError,
  HttpServerError,
} from "@/types/http.errors";
import bcrypt from "bcrypt";
import { generateToken, hashPassWord } from "@/utils/utils";

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
  const profile = await Employee.findById(account.employeeId, "info").exec();
  if (!profile) {
    throw new HttpServerError("LOGIN_NOT_FOUND_EMPLOYEE");
  }

  const payload = {
    role: account.role,
    accountId: account._id,
    empolyeeId: account.employeeId,
  };

  const token = generateToken(payload);

  return {
    username: username,
    role: account.role,
    accessToken: token,
    ...profile,
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

  if (registration.isExpired) {
    throw new HttpBadRequestError("REGISTER_TOKEN_EXPIRED");
  }

  // validate the username
  const isExist = await Account.findOne({ username: username }).exec();
  if (isExist) {
    throw new HttpConfilctError("REGISTER_CONFLICT");
  }

  // create an empty employee
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

  const payload = {
    role: account.role,
    accountId: account._id,
    empolyeeId: account.employeeId,
  };

  const token = generateToken(payload);

  return {
    username: username,
    role: account.role,
    accessToken: token,
    ...employee.info,
  };
}
