import type { Request, Response, NextFunction } from "express";
import { HttpUnauthorizedError } from "@/types/http.errors";

import type { Role } from "@/types/common";

export const authorize = (allowedRoles: Role[]) => {
  return async (req: Request, _: Response, next: NextFunction) => {
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
