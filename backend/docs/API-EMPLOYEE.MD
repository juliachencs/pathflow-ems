# The API of PathFlowEMS Backend (Employee)

The following endpoints only open to employee users.

## Profile
### GET /api/profile/me
功能：获取员工的完整信息

Response:

```Javascript
{
  success: true;
  message: string;
  data: IProfile;
}
```

### PUT /api/profile/me	
功能：更新员工的信息

Request body: `IProfile` 

Response: updated profile

```Javascript
{
  success: true;
  message: string;
  data: IProfile; // the update profile 
}
```

The server will use the employee ID decoded from the request header by default.


## Boarding <a name="user-boarding-endpoints">

### Boarding application data <a name="baording">

```typescript
export interface IBoardingData {
  name: IName;
  profileImage: string; // link to a picture
  address: IAddress;
  cellPhone: string;
  workPhone?: string;
  email: string;
  SSN: string;
  dob: string; // date of birth
  gender: string; // "male" | "female" | "NA"("I do not wish to answer")

  workAuthorization: IWorkAuthorization;

  reference: {
    person: IPerson;
    relationship: string;
  };

  emergencyContacts: [
    {
      person: IPerson;
      relationship: string;
    },
  ];
}

export interface IBoardingStatus {
  state: ApplyState; //"UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
  feedback?: string;
}

export interface IBoardingApplication {
  state: "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
  feedback?: string;
  data: IBoardingData;
}

```

### GET /api/boarding/me	
功能：get the boarding application

Response body:

```typescript
{
  success: true;
  message: string;
  data: IBoardingApplication;
}
```

### POST /api/boarding/me	
功能： submit the boarding application

Request body: `IBoardingData`

Response body:

```typescript
{
  success: true;
  message: string;
  data: IBoardingApplication;
}
```

### PUT	/api/boarding/me	
功能：re-submit updated boarding application

Request body: `IBoardingData`

Response body:

```typescript
{
  success: true;
  message: string;
  data: IBoardingApplication;
}
```


# TO BE UPDATE

## VISA
### GET	/api/visa/me

功能：获取员工的visa信息
```typescript
{
  success: true;
  data: IVisaStatus;
}
```

### PATCH	/api/visa/me	

功能：提交OPT/EAD/I983/I20文件链接

Request Body

```Typescript
{ 
  actionType: "SUBMIT";
  payload: {
    documentType: "OPT|EAD|I983|I20";
    url: "URL";
  };
}
```

Response body: updated VISA status

```Typescript
{ 
  success: true;
  data: IVisaStatus;
}
```


