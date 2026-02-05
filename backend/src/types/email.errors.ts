import type { IErrorData } from "@/types/common";

export interface INodeMailerError {
  message: string;
  code: string;
  command: string;
  response: string;
  responseCode: number;
}
export class EamilError<D extends INodeMailerError> extends Error {
  public readonly statusCode: number;
  public readonly statusMessage: string;
  public readonly error: IErrorData<D>;

  constructor(error: D) {
    super();
    const { message, code, response, responseCode } = error;
    this.statusMessage = response;
    this.statusCode = responseCode;
    this.error = { message: message, code: code, details: error };
  }
}
