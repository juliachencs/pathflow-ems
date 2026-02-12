import type { IAuthPayload } from "@/types/auth.interface";

// Declaration Merging
// inform TypeScript about the new property on the Express Request object globally.
declare global {
  namespace Express {
    export interface Request {
      auth?: IAuthPayload;
    }
  }
}
