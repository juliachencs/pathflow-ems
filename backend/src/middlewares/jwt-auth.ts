import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { HttpUnauthorizedError } from "@/types/http.errors";
import type { IAuthPayload } from "@/types/auth-request.interface";

export const jwtAuthenticate = async (
  req: Request,
  _: Response,
  next: NextFunction,
): Promise<void> => {
  // unpack the token from header
  const authBearer = req.headers?.authorization?.match(/^Bearer (.+)/);
  if (!authBearer) {
    throw new HttpUnauthorizedError("JWT_MISSING_HEADER");
  }

  const token: string | undefined = authBearer[1];
  if (!token) {
    throw new HttpUnauthorizedError("JWT_TOKEN_INCORRECT");
  }

  try {
    const accessSecret =
      process.env.JWT_ACCESS_SECRET || "somethingsupersecret";

    const decoded = jwt.verify(token, accessSecret) as IAuthPayload;

    req.auth = decoded;

    next();
  } catch (err) {
    throw new HttpUnauthorizedError("JWT_TOKEN_INVALID");
  }
};
