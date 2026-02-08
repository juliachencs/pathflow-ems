export const Roles = ["ADMIN", "USERS"] as const;
export type Role = (typeof Roles)[number];

// work authorization type
export const WorkAuthTypes = [
  "Green Card",
  "F1(CPT/OPT)",
  "Other",
  "Citizen",
  "H1-B",
  "L2",
  "H4",
] as const;
export type WorkAuthType = (typeof WorkAuthTypes)[number];

// OPT documents
export const OPTDocumentTypes = ["OPT", "EAD", "I983", "I20"] as const;
export type OPTDocumentType = (typeof OPTDocumentTypes)[number];

// State of a boarding application or a visa document
export const ApplyStates = [
  "UNSUBMIT",
  "PENDING",
  "REJECTED",
  "APPROVED",
] as const;
export type ApplyState = (typeof ApplyStates)[number];

// State of visa documents
export const VisaStates = ["PROGRESS", "FINISHED", "NA", "NR"];
export type VisaState = (typeof VisaStates)[number];

export interface JWTTokenPayload {
  role: Role;
  accountID: string;
  empolyeeID?: string;
}
