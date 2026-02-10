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

  // NOT FOUND EMPLOYEE
  NOT_FOUND_EMPLOYEE:
    "We can not find this employee in our database. Please check the employee id is correct.",

  // EMPLOYEE QUERY(GET) ENDPOITNS:
  GET_BOARDING_NOT_FOUND: "There is no boarding application for this employee.",
  GET_PROFILE_NOT_FOUND: "There is no profile data for this employee.",
  GET_VISA_NOT_FOUND: "There is no visa data for this employee.",

  // EMPLOYEE MUTATION(POST/PUT/PATCH) ENDPOINTS:
  UPDATE_PROFILE_NOT_FOUND: "We are unable to update profile",
  ILLEGAL_VISA_STATUS:
    "The visa status is illegal. Please contact the admin to check your visa status.",
  ILLEGAL_VISA_SUBMIT: "You are not supposed to submit data at this step",

  //INVITATION ERROR
  INVITE_BAD_REQUEST:
    "Please provide the name and email to invite someone to register.",
  INVITE_CONFICT: "This email has been registered.",
} as const;

// Employee get or put profile
// GET_PROFILE_NOT_FOUND:
//  "We can not find the profile of this employee. Please check the employee id is correct.",
// PUT_PROFILE_NOT_FOUND:
//   "We can not find the profile of this employee to update. Please check the employee id is correct.",

export type ErrorCode = keyof typeof ErrorMessages;
