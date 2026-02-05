import {
  inviteService,
  loginService,
  registerService,
} from "@/services/auth.service";
import { type ISuccessResponse } from "@/types/common";
import { HttpBadRequestError } from "@/types/http.errors";
import {
  isValidRegisterRequest,
  isValidLoginRequest,
  hasAllRequiredFields,
} from "@/types/request.interface";
import type { IAuthRespond } from "@/types/response.interface";
import type { Request, Response, NextFunction } from "express";

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // validate the request
    if (!isValidLoginRequest(req.body)) {
      throw new HttpBadRequestError<void>({
        code: "LOGIN_BAD_REQUEST",
      });
    }

    const { username, password } = req.body;

    const result: IAuthRespond = await loginService(username, password);

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
    if (!isValidRegisterRequest(req.body)) {
      throw new HttpBadRequestError<void>({
        code: "REGISTER_BAD_REQUEST",
      });
    }

    const { username, password, token } = req.body;

    const result: IAuthRespond = await registerService(
      username,
      password,
      token,
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function invite(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    console.log("request to invite:", req.body);

    // request validation
    const isValid = hasAllRequiredFields<{ name: string; email: string }>(
      req.body,
      ["name", "email"],
    );
    if (!isValid) {
      throw new HttpBadRequestError<void>({
        code: "INVITE_BAD_REQUEST",
      });
    }

    const { name, email } = req.body;
    await inviteService(name, email);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
