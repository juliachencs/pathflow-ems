export const ErrorMessages = {
  LOGIN_BAD_REQUEST: "Please provide your username and password to login.",
  LOGIN_UNMATCH: "The username and password do not match.",
  LOGIN_NOT_FOUND: "The username does not exist.",
  REGISTER_USERNAME_CONFLICT: "The username is not available!",
  DB_CONNECT_FAIL: "Sorry, we are not able to connect to the database!",
  INVITE_BAD_REQUEST:
    "Please provide the name and email to invite someone to register.",
  REGISTER_BAD_REQUEST:
    "Please provide your username, password and email to login.",
};
export type ErrorCode = keyof typeof ErrorMessages;

export interface IErrorData<D> {
  code: string; // Machine-readable error constant
  message: string; // Human-readable summary
  details?: D;
}
export interface IErrorResponse<D> {
  success: false;
  message: string; //HTTP ERROR MESSAGE
  error: IErrorData<D>;
}

export interface ISuccessResponse<T> {
  success: true;
  message: string; // Human-readable summary
  data?: T;
}

export type IResponse<T, D> = ISuccessResponse<T> | IErrorResponse<D>;
