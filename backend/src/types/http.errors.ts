import type { ErrorCode } from "@/types/errors";

export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly statusMessage: string;
  public readonly code: ErrorCode;
  public readonly details: unknown;

  constructor(
    statusCode: number,
    statusMessage: string,
    code: ErrorCode,
    details?: unknown,
  ) {
    super();
    this.statusMessage = statusMessage;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class HttpBadRequestError extends HttpError {
  constructor(code: ErrorCode, details?: unknown) {
    super(400, "Bad Request", code, details);
  }
}

export class HttpUnauthorizedError extends HttpError {
  constructor(code: ErrorCode, details?: unknown) {
    super(401, "Unauthorized", code, details);
  }
}

export class HttpForbiddenError extends HttpError {
  constructor(code: ErrorCode, details?: unknown) {
    super(403, "Forbidden", code, details);
  }
}

export class HttpNotFoundError extends HttpError {
  constructor(code: ErrorCode, details?: unknown) {
    super(404, "Not found", code, details);
  }
}

export class HttpConfilctError extends HttpError {
  constructor(code: ErrorCode, details?: unknown) {
    super(409, "Conflict", code, details);
  }
}
export class HttpServerError extends HttpError {
  constructor(code: ErrorCode, details?: unknown) {
    super(500, "Internal Server Error", code, details);
  }
}
