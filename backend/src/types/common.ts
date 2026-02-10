export const Roles = ["ADMIN", "USER"] as const;
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
  "Other",
] as const;
export type WorkAuthType = (typeof WorkAuthTypes)[number];

// OPT documents
export const VisaDocumentTypes = ["OPT", "EAD", "I983", "I20"] as const;
export type VisaDocumentType = (typeof VisaDocumentTypes)[number];

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
