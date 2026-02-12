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

export function fakeEmployee() {
  const  workAuthorization = fakeAuth();
  const boarding = fakeBoarding();
  const visa = {state: "NR"};
  if (workAuthorization.type=== "F1(CPT/OPT)" ) {
    visa.state = faker.helpers.arrayElement(["PROGRESS", "FINISHED"])
    if (visa.state === "FINISHED") {
      visa.curStage = 5;
      visa.documents = [
        {state: "APPROVED",documentType:"OPT", url: workAuthorization.url},
        {state: "APPROVED",documentType:"EAD", url: faker.internet.url() },
         {state: "APPROVED",documentType:"I983", url: faker.internet.url()},
         {state: "APPROVED",documentType:"I20", url: faker.internet.url()},
      ]
    } else {
      visa.curStage = 1;
       visa.documents = [
        {state: "PENDING",documentType:"OPT", url: workAuthorization.url}
      ]
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


// const users = faker.helpers.multiple(fakeEmployee, {
//   count: 20,
// });
// console.log(JSON.stringify(users));

// fs.writeFile(
//     "employees.json",
//     JSON.stringify(users), ()=>{});


const employeeIds = [
"698d6278437f628e1b34f8c9",
"698d6278437f628e1b34f8ca",
"698d6278437f628e1b34f8cb",
"698d6278437f628e1b34f8cc",
"698d6278437f628e1b34f8cd",
"698d6278437f628e1b34f8ce",
"698d6278437f628e1b34f8cf",
"698d6278437f628e1b34f8d0",
"698d6278437f628e1b34f8d1",
"698d6278437f628e1b34f8d2",
"698d6278437f628e1b34f8d3",
"698d6278437f628e1b34f8d4",
"698d6278437f628e1b34f8d5",
"698d6278437f628e1b34f8d6",
"698d6278437f628e1b34f8d7",
"698d6278437f628e1b34f8d8",
"698d6278437f628e1b34f8d9",
"698d6278437f628e1b34f8da",
"698d6278437f628e1b34f8db",
"698d6278437f628e1b34f8dc",
];

const accounts = employeeIds.map((id) => ({
  username: faker.internet.username(),
  password: faker.internet.password(),
  role:  "USER",
  email: faker.internet.email(),
  employeeId: id}));

console.log(accounts);

fs.writeFile( "accounts.json", JSON.stringify(accounts), ()=>{});