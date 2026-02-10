import type { ApplyState, VisaDocumentType } from "@/types/common";

// State of visa documents
export const VisaStates = ["PROGRESS", "FINISHED", "NA", "NR"];
export type VisaState = (typeof VisaStates)[number];

export interface IDocumentState {
  state: ApplyState;
  documentType: VisaDocumentType;
  feedback?: string;
  url?: string;
}

export interface ISubmitDocumentAction {
  actionType: "SUBMIT";
  payload: {
    documentType: VisaDocumentType;
    url: string;
  };
}

export interface IRejectDocumentAction {
  actionType: "REJECT";
  payload: {
    documentType: VisaDocumentType;
    url: string;
    feedback: string;
  };
}

export interface IAcceptDocumentAction {
  actionType: "ACCEPT";
  payload: {
    documentType: VisaDocumentType;
    url: string;
  };
}

export interface ISendNotificationAction {
  actionType: "SEND_NOTIFICATION";
  payload: {
    documentType: VisaDocumentType;
  };
}

export type IDocumentAction =
  | ISubmitDocumentAction
  | IRejectDocumentAction
  | IAcceptDocumentAction
  | ISendNotificationAction;

export type IReviewDocumentAction =
  | IRejectDocumentAction
  | IAcceptDocumentAction
  | ISendNotificationAction;

export interface IVisaStatus {
  state: VisaState;
  curStage?: number;
  documents?: IDocumentState[];
}

export interface IVisaReviewAction {
  employeeId: string;
  actionType: "APPROVE" | "ACCEPT" | "SEND_NOTIFICATION";
  payload: {
    documentType: VisaDocumentType;
    url?: string;
    feedback?: string;
  };
}
export interface IVisaFiles {
  OPT?: string;
  EAD?: string;
  I983?: string;
  I20?: string;
}

export interface IManagedVisaStatus {
  employeeId: string;
  fullName: string;
  workAuthorization: {
    title: string;
    startDate: Date;
    endDate: Date;
  };
  nextStep: string;
  action:
    | {
        actionType: "REVIEW" | "SEND_NOTIFICATION";
        payload: {
          documentType: VisaDocumentType;
          url?: string;
        };
      }
    | {};

  files: IVisaFiles;
}
