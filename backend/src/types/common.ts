// State of a boarding application or a visa document
export const ApplyStates = [
  "UNSUBMIT",
  "PENDING",
  "REJECTED",
  "APPROVED",
] as const;
export type ApplyState = (typeof ApplyStates)[number];

export const ActionTypes = [
  "SUBMIT",
  "RESUBMIT",
  "APPROVE",
  "REJECT",
  "SEND_NOTIFICATION",
] as const;
export type ActionType = (typeof ActionTypes)[number];

export interface IVisaFiles {
  OPT?: string;
  EAD?: string;
  I983?: string;
  I20?: string;
}

export type ServiceReturnType<T = unknown> = Promise<{
  message: string;
  data: T;
}>;
