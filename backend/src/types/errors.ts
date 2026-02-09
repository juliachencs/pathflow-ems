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

  //INVITATION ERROR
  INVITE_BAD_REQUEST:
    "Please provide the name and email to invite someone to register.",
  INVITE_CONFICT: "This email has been registered.",
  // DB ERROR
  // DB_INVALID_URI: "Sorry, the database uri is invalid!",
} as const;

export type ErrorCode = keyof typeof ErrorMessages;
