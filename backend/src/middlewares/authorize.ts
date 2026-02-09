import type { Response, NextFunction } from "express";
import { HttpUnauthorizedError } from "@/types/http.errors";
import type { AuthRequest } from "@/types/auth-request.interface";
import type { Role } from "@/types/employee";

export const authorize = (allowedRoles: Role[]) => {
  return async (req: AuthRequest, _: Response, next: NextFunction) => {
    // Check if req.auth is present (authentication must run first)
    if (!req.auth || !req.auth.role) {
      throw new HttpUnauthorizedError("AUTHORIZE_MISS_AUTH");
    }

    const { role } = req.auth;
    if (allowedRoles.includes(role)) {
      next(); // User has the required role, proceed
    } else {
      throw new HttpUnauthorizedError("AUTHORIZE_NO_PERMISSION");
    }
  };
};
