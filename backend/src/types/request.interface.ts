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

export function hasAllRequiredFields<T>(
  object: any,
  requiredFields: string[],
): object is T {
  // Check for null and undefined only
  if (object === null || object === undefined) {
    return false;
  }
  // Check if object
  if (typeof object !== "object") {
    return false;
  }

  // Retrieve keys from the item
  const keys = Object.keys(object);

  // Check if all required fields are present
  const hasAllRequiredFields = requiredFields.every((field) =>
    keys.includes(field),
  );

  return hasAllRequiredFields;
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
