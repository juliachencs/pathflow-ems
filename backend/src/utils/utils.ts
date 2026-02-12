import jwt, { type SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { IAuthPayload } from "@/types/auth.interface";
import type { StringValue } from "ms";
import mongoose, { isValidObjectId } from "mongoose";

//
export function generateAccessToken(payload: IAuthPayload): string {
  // the access token
  const accessSecret: string =
    process.env.JWT_ACCESS_SECRET || "somethingsupersecret";
  const accessExpire: string = process.env.JWT_ACCESS_EXPIRE || "8h";
  const accessOption: SignOptions = {
    expiresIn: accessExpire as StringValue,
  };
  const accessToken = jwt.sign(payload, accessSecret, accessOption);
  return accessToken;
}

export async function hashPassWord(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export function hasKeys<T>(
  obj: Record<string, unknown>,
  keys: readonly string[],
): obj is Record<(typeof keys)[number], unknown> {
  // Check for null and undefined only
  if (obj === null || obj === undefined) {
    return false;
  }
  // Check if object
  if (typeof obj !== "object") {
    return false;
  }

  for (const key in keys) {
    if (!(key in obj)) {
      return false;
    }
  }

  return true;
}

export const registerLink = (token: string) => {
  const base_url = process.env.FORNTEND_BASE_URL || "http://localhost:5520";
  const link = base_url + `/register?registerToken=${token}`;
  return link;
};

export function isValidID(id: string | string[] | undefined): id is string {
  if (id && typeof id === "string" && isValidObjectId(id)) {
    return true;
  }
  return false;
}

export const flattenObject = (obj: any, prefix = ""): Record<string, any> => {
  return Object.keys(obj).reduce((acc: any, k: string) => {
    const pre = prefix.length ? prefix + "." : "";
    const value = obj[k];

    // If the value is a plain object (not null, date, or array), recurse
    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !(value instanceof Date) &&
      !(value instanceof mongoose.Types.ObjectId)
    ) {
      Object.assign(acc, flattenObject(value, pre + k));
    } else {
      acc[pre + k] = value;
    }
    return acc;
  }, {});
};
