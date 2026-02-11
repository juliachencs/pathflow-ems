# Data Interface


## Boarding Application Data

```Typescript
interface BoardingData {
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
    preferredName?: string;
  };

  profileImage: string; // link to a picture

  address: {
    street: string;
    state: string;
    city: string;
    zip: string;
    secondary: string;
  };

  cellPhone: string;
  workPhone?: string;
  email: string;
  SSN: string;
  dob: string; // date of birth
  gender: string; // "male" | "female" | "NA"("I do not wish to answer")

  workAuthorization: {
    type: string; // "Green Card" |  "Citizen" | "H1-B" | "L2" | "H4" | "other" | "F1(CPT/OPT)"
    title?: string;
    startDate?: string;
    endDate?: string;
    url?: string;
  };

  reference: {
    person: {
      firstName: string;
      lastName: string;
      middleName?: string;
      phone?: string;
      email?: string;
    };
    relationship: string;
  };

  emergencyContacts: [
    {
      person: {
        firstName: string;
        lastName: string;
        middleName?: string;
        phone?: string;
        email?: string;
      };
      relationship: string;
    },
  ];
}
```

The boarding application status
```typescript
interface BoardingStatus {
  state: ApplyState; //"UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
  feedback?: string;
}
```


## Employee Profile

<details>
<summary>Full Description <a name="IProfileFull"> </summary>

```typescript
interface Profile extends BoardingData{
  visaDocuments?: {
    OPT?: URL;
    EAD?: URL;
    I983?: URL;
    I20?: URL;
  };
}

export interface IProfileFull extends IProfile {
  _id: string;
}
```
</details>

<details>
<summary> Summary Description <a name="IProfileSummary"> </summary>

```typescript
// IProfileSummary
interface IProfileSummary {
  _id: string;
  name:  {
    firstName: string;
    lastName: string;
    middleName?: string;
    preferredName?: string;
  };
  cellPhone: string;
  email: string;
  SSN: string;
  workAuthorization:{
    type: string; // | "Green Card" |  "Citizen";  
    title?: string;
    startDate?: Date; 
    endDate?: Date;
    url?: string; 
  };
}
```

</details>

<details>
<summary> Core Description <a name="IProfileCore"> </summary>

```typescript
// IProfileCore
interface IProfileCore {
  _id: string;
  fullName: string;
  email: string;
}
```

</details>

## Boarding<a name="IBoardingApplication">


### The boarding application of an employee 

<details>
<summary>
The server send back the following data to a client while requesting the boarding application of an employee.
</summary>


```typescript
// IBoardingApplication
interface IBoardingApplication { 
  _id: string; // employee id
  state:  "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
  feedback?: string;
  data: BoardingData;
}
```


After the employee successfully registers an account via the registeration link, the system  will create an "UNSUBMIT" IBoardingApplication for him. For an "UNSUBMIT" IBoardingApplication, there only `_id` and `email` fields in the `profile` with values. The `_id` is the database auto-generated unique string and the `email` is the email that received registration token. 

If the application is rejected by a HR, it will have a `feedback` field.

</details>

### HR actions on a boarding application  <a name="IBoardingReviewAction">

<details>
<summary> While a HR approves or reject a boarding application, the client should offer the following data in the request to the server.</summary>

```typescript
// IBoardingReviewAction
interface BoardingReviewAction{
  _id: string; // employee id
  actionType: "APPROVE" | "REJECT";
  payload: {
    feedback?: string;
  }
}
```
If the HR "REJECT" the employee's boarding application, there will be a `feedback` field.

</details>

## VISA

An employee with OPT work authorization should submit 4 documents step by step. His VISA Status be in `PROGRESS`, `FINISHED`, `NR`(not required), `NA` state. 

```typescript
type IVisaState = "PROGRESS" | "FINISHED" | "NR" | "NA"
```  

After an empolyee register, his visa state will be "NA". Because we still have no idea about if the work authorization this employee holds is OPT or not. After he submit his boarding application, if he holds OPT work authorization, the visa status will tranform to "PROGRESS", otherwise "NR". The visa status will change to "FINISHED" until he gets all required documents approved. 

</details>

### VISA Status

<details>
<summary>The data used by an employee to manage his VISA Status</summary>

```typescript
// IVisaStatus 
interface IVisaStatus {
  _id: string; // employeeID
  state: IVisaState;
  curState: number;
  documents: [
    {"documentType":"OPT", state: "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED", feedback?: string, url?: string };
    {"documentType":"EAD", state: "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED", feedback?: string, url?: string };
    {"documentType":"I983", state: "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED", feedback?: string, url?: string };
    {"documentType": "I20", state: "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED", feedback?: string, url?: string };
  ]
}
```

</details> 

### VISA management status
<details>
<summary>The data used by an HR to manage the empolyees VISA Status</summary>

```typescript
// IVisaManagementStatus
interface IManagedVisaStatus extends IVisaStatus{
  _id: string; // employee ID
  fullname: string;   // legal full name;
  workAuthorization: {
    title: string;
    startDate: Date;
    endDate: Date;
  }

  nextStep: {
    message: "waiting for OPT|EAD|I983|I20" | "waiting for approval" | "send notification";
  }
  
  action: {
    actionType: "APPROVE" | "REJECT" | "SEND_NOTIFICATION"; 
    payload{ 
      documentType: "OPT|EAD|I983|I20";
      url?: "URL";
    }
  }

  documents: {
    OPT: URL;
    EAD: URL;
    I983: URL;
    I20: URL;
  }
}
```
</details>

### HR actions on an employee's visa <a name="IVisaReviewAction">

<details>
<summary>While a HR approves or reject a visa document, the client should offer the following data in the request to the server. </summary>

```typescript
// IVisaReviewAction
interface IVisaReviewAction {
  _id: string; // employee ID
  actionType: "APPROVE" | "REJECT" | "SEND_NOTIFICATION";
  payload: {
    documentType: "OPT|EAD|I983|I20";
    url?: "URL";
    feedback?: string;
  };
}
```

If the action is "APPROVE" or "REJECT", there will be an url for that document. 
If the action is "REJECT", there will be a `feedback` field in the `payload`.

</details>