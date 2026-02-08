import { loginService, registerService } from "@/services/auth";
import { type ISuccessResponse } from "@/types/common";
import { HttpBadRequestError } from "@/types/http.errors";
import type { IAuthRespond } from "@/types/response.interface";
import { hasKeys } from "@/utils/utils";
import type { Request, Response, NextFunction } from "express";

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // validate the request
    if (!hasKeys(req.body, ["username", "password"])) {
      throw new HttpBadRequestError("LOGIN_BAD_REQUEST");
    }

    const { username, password } = req.body;

    const result = await loginService(username, password);

    res.status(200).json({
      success: true,
      message: "You've logged in!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function signout(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    console.log("Request to sign out");
    // TODO? add refresh token related logic here
    const result: ISuccessResponse<void> = {
      success: true,
      message: "You have signed out!",
    };

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    console.log("request to register:", req.body);

    const { username, password, registerToken } = req.body;

    const result: IAuthRespond = await registerService(
      username,
      password,
      registerToken,
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
