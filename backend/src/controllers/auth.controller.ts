import { loginService, registerService } from "@/services/auth.service";
import type { Request, Response, NextFunction } from "express";

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { username, password } = req.body;

    const { message, data } = await loginService(username, password);

    res.status(200).json({
      success: true,
      message,
      data,
    });
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
    const { username, password, email, registerToken } = req.body;

    const { message, data } = await registerService(
      username,
      password,
      email,
      registerToken,
    );

    res.status(201).json({
      success: true,
      message,
      data,
    });
  } catch (error) {
    next(error);
  }
}

// not really do anything
export async function signout(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    console.log("Request to sign out");
    res.status(200).json({
      success: true,
      message: "You have signed out!",
    });
  } catch (error) {
    next(error);
  }
}

const AuthController = { login, signout, register };

export default AuthController;
