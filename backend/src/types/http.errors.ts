import { ErrorMessages, type IErrorData } from "@/types/common";

type Params<D> = Omit<IErrorData<D>, "message">;

export class HttpError<D> extends Error {
  public readonly statusCode: number;
  public readonly statusMessage: string;
  public readonly error: IErrorData<D>;

  constructor(pramas: Params<D>, statusCode: number, statusMessage: string) {
    super();
    this.statusMessage = statusMessage;
    this.statusCode = statusCode;
    this.error = { message: ErrorMessages[pramas.code], ...pramas };
  }
}

export class HttpBadRequestError<D> extends HttpError<D> {
  constructor(pramas: Params<D>) {
    super(pramas, 400, "Bad Request");
  }
}

export class HttpUnauthorizedError<D> extends HttpError<D> {
  constructor(pramas: Params<D>) {
    super(pramas, 401, "Unauthorized");
  }
}

export class HttpForbiddenError<D> extends HttpError<D> {
  constructor(params: Params<D>) {
    super(params, 403, "Forbidden");
  }
}

export class HttpNotFoundError<D> extends HttpError<D> {
  constructor(pramas: Params<D>) {
    super(pramas, 404, "Not found");
  }
}

export class HttpConfilctError<D> extends HttpError<D> {
  constructor(pramas: Params<D>) {
    super(pramas, 409, "Conflict");
  }
}
export class HttpServerError<D> extends HttpError<D> {
  constructor(params: Params<D>) {
    super(params, 500, "Internal Server Error");
  }
}
