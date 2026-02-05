import sendInvitation from "@/configs/email";
import transporter from "@/configs/email";
import { Registration } from "@/models/registration.model";
import { User } from "@/models/user.model";
import { EamilError } from "@/types/email.errors";
import {
  HttpBadRequestError,
  HttpConfilctError,
  HttpNotFoundError,
} from "@/types/http.errors";
import type { IRegistration } from "@/types/registration.interface";
import type { IAuthRespond } from "@/types/response.interface";
import type { IUser } from "@/types/user.interface";
import { generateToken } from "@/utils/jwt.utils";
import bcrypt from "bcrypt";
import type { HydratedDocument } from "mongoose";

export async function loginService(
  username: string,
  password: string,
): Promise<IAuthRespond> {
  const user: HydratedDocument<IUser> | null = await User.findOne({ username });

  if (!user) {
    throw new HttpNotFoundError({ code: "LOGIN_NOT_FOUND" });
  }

  const passwordMatch: boolean = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new HttpBadRequestError<void>({
      code: "LOGIN_UNMATCH",
    });
  }

  const token = generateToken(user);

  return {
    role: user.role,
    token: token,
  };
}

export async function inviteService(
  name: string,
  email: string,
): Promise<void> {
  const hasEmail: IRegistration | null = await Registration.findOne({ email });

  if (hasEmail) {
    // throw error
  }

  const uniqueToken = crypto.randomUUID();
  // TODO: await the email send
  try {
    await sendInvitation(email, name, uniqueToken);
  } catch (error) {
    //https://nodemailer.com/errors

    throw new EamilError<typeof error>(error);
  }

  const registration = new Registration({
    name,
    email,
    token: uniqueToken,
  });

  await registration.save();
}

export async function registerService(
  username: string,
  password: string,
  register_token: string,
): Promise<IAuthRespond> {
  // check if username exists
  const hasUser: IUser | null = await User.findOne({ username });
  if (hasUser) {
    throw new HttpConfilctError({ code: "REGISTER_USERNAME_CONFLICT" });
  }
  // TODO: check the token is valid

  // create and save user
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  const user = new User({
    username: username,
    password: hash,
  });

  await user.save();
  const jwtToken = generateToken(user);

  return {
    role: user.role,
    token: jwtToken,
  };
}
