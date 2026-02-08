# Data Interface

## Employee Profile

<details>
<summary>Full Description <a name="IProfileFull"> </summary>

```typescript
// IProfileFull
interface IProfileFull {
  _id: string;

  name: {
    firstName: string;
    lastName: string;
    middleName: string;
    preferredName: string;
  };

  profileImage: URL; // link to a picture

  address: {
    street: string;
    state:  string;
    city:   string;
    zip:    string;
    secondary : string | "", 
  };

  cellPhone: string;
  workPhone: string;
  email: string;
  SSN: string;
  dob: string; // date of birth
  gender: string;

  workAuthorization:{
    type: string; // | "Green Card" |  "Citizen";  
    title: string;
    startDate: Date; 
    endDate: Date;
    url: string; 
  };

  reference: {
    person: {
      firstName: string;
      lastName: string;
      middleName: string;
      phone: string;
      email: string;
    },
    relationship: string;
  };
  
  emergencyContacts: [{
    person: {
      firstName: string;
      lastName: string;
      middleName: string;
      phone: string;
      email: string;
    };
    relationship: string}];
  
  visaDocuments: {
    OPT: URL;
    EAD: URL;
    I983: URL;
    I20: URL;
  }  
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
    middleName: string;
    preferredName: string;
  };
  
  SSN: string;
  workAuthorization:{
    type: string; // | "Green Card" |  "Citizen";  
    title: string;
    startDate: Date; 
    endDate: Date;
    url: string; 
  };
  cellPhone: string;
  email: string;
}
```

</details>

<details>
<summary> Core Description <a name="IProfileCore"> </summary>

```typescript
// IProfileCore
IProfileCore interface {
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
  profile: IProfileFull;
  feedback?: string;
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
interface IBoardingReviewAction{
  _id: string; // employeeID
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
  documents: [
    {OPT: {state: "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED", feedback?: string, url?: URL }};
    {EAD: {state: "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED", feedback?: string, url?: URL }};
    {I983:{state: "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED", feedback?: string, url?: URL }};
    {I20: {state: "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED", feedback?: string, url?: URL }};
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