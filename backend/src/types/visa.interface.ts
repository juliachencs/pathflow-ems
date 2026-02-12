import type { IName } from "@/types/boarding.interface";
import type { ApplyState, IVisaFiles } from "@/types/common";

// State of VISA Documents

export const VisaStates = ["PROGRESS", "FINISHED", "NA", "NR"];
export type VisaState = (typeof VisaStates)[number];

// OPT documents
export const VisaDocumentTypes = ["OPT", "EAD", "I983", "I20"] as const;
export type VisaDocumentType = (typeof VisaDocumentTypes)[number];

export interface IDocumentState {
  state: ApplyState;
  documentType: VisaDocumentType;
  feedback?: string;
  url?: string;
}

export interface IVisaStatus {
  state: VisaState;
  curStage?: number;
  documents?: IDocumentState[];
}

// Document Actions
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

export type IReviewDocumentAction =
  | IRejectDocumentAction
  | IAcceptDocumentAction
  | ISendNotificationAction;

export type IDocumentAction = ISubmitDocumentAction | IReviewDocumentAction;

export interface IReviewVisaAction {
  actionType: "APPROVE" | "ACCEPT" | "SEND_NOTIFICATION";
  payload: {
    documentType: VisaDocumentType;
    url?: string;
    feedback?: string;
  };
}

export interface IManagedVisaStatus {
  employeeId: string;
  name: IName;
  workAuthorization: {
    title: string;
    startDate: string;
    endDate: string;
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
