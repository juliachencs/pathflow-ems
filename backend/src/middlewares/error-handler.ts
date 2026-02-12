import { EamilError } from "@/types/email.errors";
import { HttpError } from "@/types/http.errors";
import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error handler");
  console.error(err);

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.statusMessage,
      error: {
        code: err.code,
        description: {},
      },
    });
  } else if (err instanceof EamilError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: {
        code: err.code,
        description: err.description,
        details: err.details,
      },
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: "SERVER_ERROR_UNKOWN",
        description: err.message,
      },
    });
  }
};

export default errorHandler;
