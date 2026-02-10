// Declaration Merging

import type { IAuthPayload } from "@/types/auth-request.interface";

// inform TypeScript about the new property on the Express Request object globally.
declare global {
  namespace Express {
    export interface Request {
      auth?: IAuthPayload;
    }
  }
}
