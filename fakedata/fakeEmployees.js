import { faker } from "@faker-js/faker"; //console.log("hello world");npm install --save-dev @faker-js/faker
import fs from "fs"; 

const ApplyState=["PENDING", "REJECTED", "APPROVED"];

const  Gender = ["male","female", "na"];

 const AuthType = [ "Green Card" |  "Citizen" | "H1-B" | "L2" | "H4" | "other" | "F1(CPT/OPT)"];

const  AuthOther = ["EB1", "EB2"] ;
function fakeAuth() {
  const type = faker.helpers.arrayElement(AuthType);
  switch (type) {
    case "Green Card":
    case "Citizen":
      return { type: type };
    case "H1-B":
    case "L2":
    case "H4":
      return {
        type: type,
        startDate: faker.date.past({ years: 2 }),
        endDate: faker.date.future({ years: 2 }),
      };
    case "other":
      return {
        type: type,
        title: faker.helpers.arrayElement(AuthOther),
        startDate: faker.date.past({ years: 2 }),
        endDate: faker.date.future({ years: 2 }),
      };
  }

  return {
    type: "F1(CPT/OPT)",
    url: faker.internet.url(),
    startDate: faker.date.past({ years: 1 }),
    endDate: faker.date.future({ years: 1 }),
  };
}

function fakeBoarding() {
  const state = faker.helpers.arrayElement(ApplyState);
  switch (state) {
    case "PENDING":
    case "APPROVED":
      return { state: state };
  }
  return { state: state, feedback: faker.lorem.sentence() };
}

function fakeInProgressVisa(workAuthorization) {

  function fakeInStageDocument(stage){

    const docTypes = ["OPT", "EAD", "I983", "I20"];
    const documentType = docTypes[stage];
   
    const states = stage === 0 ? ["PENDING", "REJECTED"] : ["UNSUBMIT", "PENDING", "REJECTED"];
    const state =  faker.helpers.arrayElement(states);

    if ( state === "REJECTED" ) {
      const url = stage === 0 ? workAuthorization.url : faker.internet.url();
      return {documentType, url, state, feedback: faker.lorem.sentence() };
    }

    if (state === "PENDING") {
      const url = stage === 0 ? workAuthorization.url : faker.internet.url();
      return {documentType, url, state};
    }

    return {documentType, state};
  }

  const curStage =  faker.helpers.arrayElement([1, 2, 3, 4, 5]);
  const state = curStage === 5 ? "FINISHED" : "PROGRESS";

  const APPROVED =  [
    {state: "APPROVED",documentType:"OPT", url: workAuthorization.url},
    {state: "APPROVED",documentType:"EAD", url: faker.internet.url() },
    {state: "APPROVED",documentType:"I983", url: faker.internet.url()},
    {state: "APPROVED",documentType:"I20", url: faker.internet.url()},
  ]
  
  const UNSUBMIT = [
    {state: "UNSUBMIT",documentType:"OPT" },
    {state: "UNSUBMIT",documentType:"EAD" },
    {state: "UNSUBMIT",documentType:"I983"},
    {state: "UNSUBMIT",documentType:"I20"},
  ]
  function makeDocuments() {
    switch (curStage) {
      case 1: return [fakeInStageDocument(0), UNSUBMIT[1], UNSUBMIT[2], UNSUBMIT[3]];
      case 2: return [APPROVED[0], fakeInStageDocument(1), UNSUBMIT[2], UNSUBMIT[3]];
      case 3: return [APPROVED[0], APPROVED[1], fakeInStageDocument(2), UNSUBMIT[3]];
      case 4: return [APPROVED[0], APPROVED[1], APPROVED[2], fakeInStageDocument(3)];
    }
    return APPROVED;

  }
  const documents = makeDocuments();

  return {state, curStage, documents};
}

export function fakeEmployee() {
  const  workAuthorization = fakeAuth();
  const boarding = fakeBoarding();
  let visa = {state: "NR"};
  
  if (workAuthorization.type=== "F1(CPT/OPT)") {
    
    if (boarding.state === "APPROVED") {
      visa = fakeInProgressVisa(workAuthorization);
    } else {
      visa = {
        state: "PROGRESS",
        curStage: 1,
        documents:[ 
          {state: "PENDING",documentType:"OPT", url: workAuthorization.url},
          {state: "UNSUBMIT",documentType:"EAD" },
          {state: "UNSUBMIT",documentType:"I983"},
          {state: "UNSUBMIT",documentType:"I20"},
        ]
      }
    }
   
  }
  const data = {
    name: {
      firstName: faker.person.firstName(),
      lastName: faker.person.firstName(),
    },
    profileImage: faker.image.url(),
    address: {
      street: faker.location.streetAddress(),
      state: faker.location.state(),
      city: faker.location.city(),
      zip: faker.location.zipCode(),
      secondary: faker.location.secondaryAddress(),
    },
    cellPhone: faker.string.numeric(10),
    email: faker.internet.email(),
    SSN: faker.string.numeric(9),
    dob: faker.date.birthdate({ mode: "age", min: 18, max: 65 }), // date of birth
    gender: faker.helpers.arrayElement(Gender), // "male" | "
    reference: {
      person: {
        firstName: faker.person.firstName(),
        lastName: faker.person.firstName(),
      },
      relationship: "friend",
    },

    emergencyContacts: [{
      person: {
        firstName: faker.person.firstName(),
        lastName: faker.person.firstName(),
      },
      relationship: "friend",
    }],

    workAuthorization, 
  };

  return  {data, boarding, visa}
}


const users = faker.helpers.multiple(fakeEmployee, {
  count: 20,
});

console.log(users);
// fs.writeFile(
//     "employees.json",
//     JSON.stringify(users), ()=>{console.log("DONE");});


// const employeeIds = [
// "698d8cc6437f628e1b34f92b",
// "698d8cc6437f628e1b34f92c",
// "698d8cc6437f628e1b34f92d",
// "698d8cc6437f628e1b34f92e",
// "698d8cc6437f628e1b34f92f",
// "698d8cc6437f628e1b34f930",
// "698d8cc6437f628e1b34f931",
// "698d8cc6437f628e1b34f932",
// "698d8cc6437f628e1b34f933",
// "698d8cc6437f628e1b34f934",
// "698d8cc6437f628e1b34f935",
// "698d8cc6437f628e1b34f936",
// "698d8cc6437f628e1b34f937",
// "698d8cc6437f628e1b34f938",
// "698d8cc6437f628e1b34f939",
// "698d8cc6437f628e1b34f93a",
// "698d8cc6437f628e1b34f93b",
// "698d8cc6437f628e1b34f93c",
// "698d8cc6437f628e1b34f93d",
// "698d8cc6437f628e1b34f93e",
// ];

// const accounts = employeeIds.map((id) => ({
//   username: faker.internet.username(),
//   password: "$2b$10$UB6z.bt204oEaFAIx82mpOWkAR5.ygHT2dZm/v8DsfeliFIX9at0O", //ABC@abc@123
//   role:  "USER",
//   email: faker.internet.email(),
//   employeeId: id}));

// console.log(accounts);

// fs.writeFile( "accounts.json", JSON.stringify(accounts), ()=>{console.log("finished");});