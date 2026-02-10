export const ErrorMessages = {
  // LOGIN ERROR
  LOGIN_BAD_REQUEST: "Please provide your username and password to login.",
  LOGIN_UNMATCH: "The username and password do not match.",
  LOGIN_NOT_FOUND: "The username does not exist.",
  LOGIN_NOT_FOUND_EMPLOYEE:
    "Every account is supposed to belong to an employee",

  // REGISTER ERROR
  REGISTER_BAD_REQUEST:
    "Please provide your username, password and email to login.",
  REGISTER_TOKEN_NOT_FOUND: "Sorry, we are not able to found the token.",
  REGISTER_TOKEN_EXPIRED: "Sorry, the token is expired",
  REGISTER_CONFLICT: "The username has been occupied!",

  // JWT
  JWT_MISSING_HEADER: "Missing authorization header",
  JWT_TOKEN_INCORRECT:
    "The format of token is not correct. Token should be in format Bear token",
  JWT_TOKEN_INVALID: "The access token is invalid",

  // ROLE control
  AUTHORIZE_MISS_AUTH: "There is no auth information available",
  AUTHORIZE_NO_PERMISSION: "You don't have permission to access the resource",

  //INVITATION ERROR
  INVITE_BAD_REQUEST:
    "Please provide the name and email to invite someone to register.",
  INVITE_CONFICT: "This email has been registered.",
  // DB ERROR
  // DB_INVALID_URI: "Sorry, the database uri is invalid!",

  // Employee get or put profile
  GET_PROFILE_NOT_FOUND:
    "We can not find the profile of this employee. Please check the employee id is correct.",
  PUT_PROFILE_NOT_FOUND:
    "We can not find the profile of this employee to update. Please check the employee id is correct.",

  // EMPLOYEE submit or resubmit boarding application
  SUBMIT_BOARDING_NOT_FOUND:
    "We can not find this employee. Please check the employee id is correct.",
  GET_BOARDING_NOT_FOUND:
    "We cannot find the boarding application of the employee.",
} as const;

export type ErrorCode = keyof typeof ErrorMessages;
