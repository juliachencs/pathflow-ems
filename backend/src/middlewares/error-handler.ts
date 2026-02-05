import { HttpError } from "@/types/http.errors";
import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.statusMessage,
      error: err.error,
    });
  } else {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: "SERVER_ERROR_UNKOWN",
        message: err.message,
      },
    });
  }
};
