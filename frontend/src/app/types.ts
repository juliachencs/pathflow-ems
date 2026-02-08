export interface KnownError {
  message: string;
  description: string;
  code: number;
}

export type UserRole = "USER" | "ADMIN";
export type BoardingStatus = "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
export type VisaStatus = "PROGRESS" | "FINISHED" | null | "NA";