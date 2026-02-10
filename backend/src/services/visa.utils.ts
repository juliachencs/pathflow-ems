import type { IEmployee } from "@/types/employee.interface";
import type {
  IDocumentState,
  IManagedVisaStatus,
  IVisaFiles,
  IVisaStatus,
} from "@/types/visa.interface";

export function initVisaStatus(workAuth) {
  // not opt
  if (workAuth.type !== "F1(CPT/OPT)") {
    return { state: "NR" };
  }

  // opt
  return {
    state: "PROGRESS",
    curStage: 1,
    documents: [
      {
        documentTyp: "OPT",
        state: "PENDING",
        url: workAuth.url,
      },
      { documentType: "EAD", state: "UNSUBMIT" },
      { documentType: "I983", state: "UNSUBMIT" },
      { documentType: "I20", state: "UNSUBMIT" },
    ],
  } as IVisaStatus;
}

// export function updateVisa(cur, action) {
//   // check if state is legal
//   if (!isLegalStatus(cur)) {
//     return false;
//   }

//   // check if action is legal
//   if (!isLegalAction(cur, action)) {
//     return false;
//   }

//   if (action.actionType === "SEND_NOTIFICATION") {
//     // send notification
//   } else {
//     transit(cur, action);
//     return cur;
//   }

//   return true;
// }

export function nextVisaStep(cur) {
  if (cur.state === "NA" || cur.state === "NR") {
    return {
      nextStep: "NA",
      action: {},
    };
  }

  if (cur.state === "FINISHED") {
    return {
      nextStep: "DONE",
      action: {},
    };
  }

  // in progress
  const doc = cur.documents[cur.curStage - 1];
  switch (doc.state) {
    case "UNSUBMIT":
    case "REJECTED":
      return {
        nextStep: "Waiting for " + doc.documentType,
        action: {
          actionType: "SEND_NOTIFICATION",
          payload: {
            documentType: doc.documentType,
          },
        },
      };
    case "PENDING":
      return {
        nextStep: "Waiting for approval",
        action: {
          actionType: "REVIEW",
          payload: { documentType: doc.documentType, url: doc.url },
        },
      };
  }

  return {
    nextStep: "Done",
    action: {},
  };
}

export function transit(cur, action) {
  // assume both  cur and action are valid.

  // action should be one of "SUBMIT" "APPROVE" "REJECT"
  let doc = {
    documentType: action.payload.documentType,
    url: action.payload.url,
  };

  switch (action.actionType) {
    case "APPROVE":
      doc.state = "APPROVED";
      break;
    case "REJECT":
      doc.state = "REJECTED";
      doc.feedback = action.payload.feedback;
      break;
    case "SUBMIT":
      doc.state = "PENDING";
      break;
  }

  // update the current document state
  cur.documents[cur.curStage - 1] = doc;

  // check if we should move to next stage
  if (doc.state === "APPROVED") {
    cur.curStage = cur.curStage + 1;
  }

  // check if we have complete the whole process
  if (cur.curStage === 5) {
    cur.state = "FINISHED";
  }
  return cur;
}

export function isLegalStatus(cur) {
  if (cur.state === "NA" || cur.state === "NR" || cur.state === "FINISHED") {
    return true;
  }

  if (cur.state !== "PRGORESS") {
    return false;
  }

  // the valid state for progress
  // valid curStage: 1, 2, 3, 4
  if (!Array.from([1, 2, 3, 4]).includes(cur.curStage)) {
    return false;
  }

  //TODO: all documents before state should be approved
  // TODO: the document of curStage, it's stage should not be approved.
  //TODO: all documents after state should be unsubmitted
  return true;
}

export function isLegalAction(cur, action) {
  // no operation is allowed if the state is not progress
  if (cur.state !== "PROGRESS") {
    return false;
  }

  // cur.state is progress
  const doc = cur.documents[cur.curStatge - 1];
  if (doc.documentType !== action.payload.documentType) {
    return false;
  }

  switch (doc.state) {
    case "UNSUBMIT":
    case "REJECTED":
      return (
        action.actionType == "SUBMIT" ||
        action.actionType == "SEND_NOTIFICATION"
      );

    case "PENDING":
      return action.actionType == "REJECT" || action.actionType == "APPROVE";
  }

  return false;
}

export function collectFiles(visa: IVisaStatus) {
  if (visa.state === "NA" || visa.state === "NR" || !visa.documents) {
    return {};
  }

  if (visa.documents.slice(0, visa.curStage).length == 0) {
    return {};
  }

  const docs = visa.documents.slice(0, visa.curStage);
  const files: IVisaFiles = {};
  for (const doc of docs) {
    if (doc.url) {
      files[doc.documentType] = doc.url;
    }
  }
  return files;
}

// export function toManagedVisaStatus(employee: IEmployee): IManagedVisaStatus {
//   const employeeId: string = employee._id;
//   const fullName: string =
//     employee.data.name.firstName + " " + employee.data.name.lastName;
//   const workAuthorization = {
//     title:
//       employee.data.workAuthorization.title ||
//       employee.data.workAuthorization.type,
//     startDate: employee.data.workAuthorization.startDate || new Date(),
//     endDate: employee.data.workAuthorization.endDate || new Date(),
//   };

//   const { nextStep, action } = nextVisaStep(employee.visa);
//   const files = collectFiles(employee.visa);
//   return {
//     employeeId,
//     fullName,
//     workAuthorization,
//     nextStep,
//     action,
//     files,
//   };
// }
