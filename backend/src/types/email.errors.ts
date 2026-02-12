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
  public readonly code: string;
  public readonly description: string;
  public readonly details: D;

  constructor(error: D) {
    super();
    const { message, code, response, responseCode } = error;
    this.statusCode = responseCode;
    this.statusMessage = response;
    this.code = code;
    this.description = message;
    this.details = error;
  }
}
