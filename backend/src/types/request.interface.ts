import { PassThrough } from "node:stream";

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRegisterRequest {
  username: string;
  password: string;
  token: string;
}

export function isValidLoginRequest(obj: any): obj is ILoginRequest {
  return hasAllRequiredFields<ILoginRequest>(obj, ["username", "password"]);
}

export function isValidRegisterRequest(obj: any): obj is IRegisterRequest {
  return hasAllRequiredFields<IRegisterRequest>(obj, [
    "username",
    "password",
    "token",
  ]);
}
