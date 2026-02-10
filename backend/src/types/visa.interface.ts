import type { ApplyState, VisaDocumentType } from "@/types/common";

// State of visa documents
export const VisaStates = ["PROGRESS", "FINISHED", "NA", "NR"];
export type VisaState = (typeof VisaStates)[number];

export interface IDocumentState {
  state: ApplyState;
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
    url: string;
  };
}

export type IDocumentAction =
  | ISubmitDocumentAction
  | IRejectDocumentAction
  | IAcceptDocumentAction
  | ISendNotificationAction;

export interface IVisaStatus {
  state: VisaState;
  curStage?: number;
  documents?: [
    { OPT: IDocumentState },
    { EAD: IDocumentState },
    { I983: IDocumentState },
    { I20: IDocumentState },
  ];
}

function nextVisaStep(cur: IVisaStatus) {}

function nextVisaState(cur: IVisaStatus, action: IDocumentAction) {

  // no change
  if (action.actionType === "SEND_NOTIFICATION") {
    return cur;
  }
  
  // submit
  if 

  const result = {};
  return result;
}

function nextDocState(state: IDocumentState, actionType:) {}
