// Declaration Merging
// inform TypeScript about the new property on the Express Request object globally.
declare namespace Express {
  export interface Request {
    auth: JwtPayload;
  }
}
