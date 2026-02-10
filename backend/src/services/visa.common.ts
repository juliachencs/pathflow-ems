import { VisaStates } from "@/types/visa.interface";



export function InitVisa(workAuth){
  // not opt
  if (workAuth.type !== "F1(CPT/OPT)") {
    return {state: "NR"}
  }

  // opt
  return {
    state: "PROGRESS",
    curStage: 1,
    documents: [
      {docType: "OPT", state: "PENDING", url: workAuth.url}, 
      {docType: "EAD", state: "UNSUBMIT"},
      {docType: "I983", state: "UNSUBMIT"},
      {docType: "I20", state: "UNSUBMIT"},
    ]
  } 
} 

export function updateVisa(cur, action) {
  // check if action is legal 

  // 

}

function isLegalState(cur) {
  
  VisaStates.includes(cur.state)
  console.log();
}
function isLegalAction(cur, action) {
  // no operation is allowed if the state is not progress
  if (cur.state !== "PROGRESS") {
    return false;
  }

  if (cur.state)
}