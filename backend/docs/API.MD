
## 后端功能总览

/auth
- 登录
- 注册
- 登出

/hr

注册：
- 添加并发送注册邀请给新员工
- 读取所有已邀请人的信息

员工信息读取
- 读取某个员工的visa信息
- 读取某个员工的profile信息
- 读取某个员工的visa信息

boarding
- 按照boarding状态读取员工信息：
  - boarding-finished(approved + other-visa-status)
  - boarding-pending
  - boarding-rejected
  - boarding-approved
  
- 操作
  - approve/reject a boarding application

visa
- 按照visa状态读取员工信息
  - all
- 操作
  - approve/reject a visa document
  
/employee
- 读取个人信息
- 修改个人信息
- OPT-employee: 
  - 读取个人boarding信息
  - 提交个人boarding信息
- OPT-employee: 
  - 读取个人visa信息
  - 提交visa文件


## Endpoints

| Method | Category     | Role  | Endpoint                   | 功能                                                                       |
| ------ | ------------ | ----- | -------------------------- | -------------------------------------------------------------------------- |
| POST   | AUTH         | ANY   | /api/auth/register         | 注册                                                                       |
| POST   | AUTH         | ANY   | /api/auth/login            | 登录                                                                       |
| POST   | AUTH         | ANY   | /api/auth/signout          | 登出                                                                       |
| GET    | PROFILE      | ADMIN | /api/profiles              | 获取所有员工的“基本信息”(profile summary)                                     |
| GET    | PROFILE      | ADMIN | /api/profiles/:id          | 获取某个员工“完整信息”(profile)                                              |
| GET    | REGISTRATION | ADMIN | /api/registrations/history | 查看registration history                                                   |
| POST   | REGISTRATION | ADMIN | /api/registrations/invite  | 请求发送registration link                                                   |
| GET    | BOARDING     | ADMIN | /api/boardings             |                                                                            |
| GET    | BOARDING     | ADMIN | /api/boardings/:status     | 获取所有boarding处于pending \| rejected \| approved 状态的员工的“核心信息”    |
| GET    | BOARDING     | ADMIN | /api/boardings/:id         | 获取某位员工的boarding application                                          |
| PUT    | BOARDING     | ADMIN | /api/boardings/:id         | Reject/Approve 某位处在boarding pending状态员工的boarding application       |
| GET    | VISA         | ADMIN | /api/visas                 | 获取所有OPT员工的visa状态                                                   |
| GET    | VISA         | ADMIN | /api/visas/progress        | 获取所有未完成OPT文件审核的OPT员工的visa状态                                 |
| GET    | VISA         | ADMIN | /api/visas/:id             |                                                                           |
| PUT    | VISA         | ADMIN | /api/visas/:id             | 对某个员工的visa document进行Reject/Approve/send notification操作           |
| GET    | PROFILE      | USER  | /api/profile/me            | 获取员工的完整信息                                                          |
| PUT    | PROFILE      | USER  | /api/profile/me            | 更新员工的信息                                                              |
| GET    | VISA         | USER  | /api/visa/me               | 获取员工的visa信息                                                          |
| PUT    | VISA         | USER  | /api/visa/me               | 提交OPT/EAD/I983/I20文件链接                                                |

## Data Interfaces

### Employee profile
<details>

```typescript
// IProfileFull
{
  _id: string;

  name: {
    firstName: string;
    lastName: string;
    middleName: string;
    preferredName: string;
  };

  profile: URL; // link to a picture

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
  
  documents: {
    OPT: URL;
    EAD: URL;
    I983: URL;
    I20: URL;
  }  
}
```

</details>

### Employee profile summary <a name="IProfileSummary">

<details> 

```typescript
// IProfileSummary
{
  _id: string;
  name: string; // legal full name
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

## AUTH (open to both HR and employees)

- POST	AUTH	ANY	/api/auth/register
- POST	AUTH	ANY	/api/auth/login
- POST	AUTH	ANY	/api/auth/signout

### POST /api/auth/register <a name="register">
<details>
Request body:
```typescript
{
  password: string;
  email: string;
  registerToken: string;
}
```

Response body:
```typescript
{
  success: true;
  data: {
    role: "USER" | "AMDIN";
    accessToken: string;
    employeeId: string;
    boarding:  "UNSUBMIT";
    visa: "NA"
  }
}
```
</details>

### POST /api/auth/login  <a name="login">

<details>
Request body:
```typescript
{
  username: string;
  password: string;
  boarding: "UNSUBMIT";
  visa: "PROGRESS";
}
```

Response body:
```typescript
{
  success: true;
  data: {
    role: "USER" | "AMDIN";
    accessToken: string;
    employeeId: string;
    boarding:  "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED" ;
    visa: "PROGRESS" | "FINISHED" | null | "NA"; 
  }
}
```
Notes
- `null` means for this employee is not an OPT-employee.
- `NA` means we are not sure if this employee's work authorization. 
</details>

### POST /api/auth/signout  <a name="signout">
- Request body: EMPTY
- Response: 204


## Endpoints open to HR

### Profiles 
#### GET /api/profiles	<a name="profiles">
Response body:
```typescript
{
  success: true;
  data: IProfileSummary[];
}
```
Notes: the interface of [IProfileSummary](#IProfileSummary).
#### GET /api/profiles/:id
Query Parameter: `id` is the `_id` field of the employee.

Response body:
```typescript
{
  success: true;
  data: IProfileSummary;
}
```
Notes: the interface of [IProfileSummary](#IProfileSummary).

### Registrations
#### GET /api/registration/history  <a name="history">

Response body:
```typescript
{
  success: true;
  data: [{
      name: string;
      email: string#;
      registerToken: string;
      createAt: string;
      expireAt: string;
  }]
}
```

#### POST /api/registration/invite <a name="invite">
Request body:
```typescript
{
  name: string;
  email: string;
}
```
Response: 204

### Boarding endpoints
- GET	BOARDING	ADMIN	/api/boardings/:status
- GET	BOARDING	ADMIN	/api/boardings/:id
- PUT	BOARDING	ADMIN	/api/boardings/:id

#### GET /api/boardings/:id
`id`: the `_id` of an employee 
Response body:
```typescript
{
  success: true;
  data: IProfile[]
}
```

#### PUT /api/boardings/:id
Request: `id`: the `_id` of an employee.

Request body:
```typescript
{
  action: "APPROVE";
} | {
  action: "REJECT";
  payload: {feedback: string};
}
```
❓Response body: Do I need to give the updated list of pending/rejected/approved boarding applications?


#### GET /api/boardings/:status
Request: `'status' : "PENDING" | "REJECTED" | "APPROVED"`

Response body:
```typescript
{
  success: true;
  data: IProfileSummary[]
}
```

### Visa endpoints
- GET VISA	ADMIN	/api/visas
- GET	VISA	ADMIN	/api/visas/progress
- PUT	VISA	ADMIN	/api/visas/:id
#### GET /api/visas/progress
Response body
```typescript
{
  success: true;
  name: string; // legal full name;
  workAuthorization: {
    title: string;
    startDate: Date;
    endDate: Date;
  }
  nextStep: "waiting for OPT|EAD|I983|I20" | "waiting for approval";
  actions: {
    documentType: "OPT|EAD|I983|I20";
    url: "URL";// Url to OPT|EAD|I983|I20  
  } | null;
}
```

#### GET /api/visas

Response body
```typescript
{
  success: true;
  name: string; // legal full name;
  workAuthorization: {
    title: string;
    startDate: Date;
    endDate: Date;
  }
  nextStep: "waiting for OPT|EAD|I983|I20" | "waiting for approval";
  documents: [
    {"OPT": URL}  | EMPTY,
    {"EAD": URL}  | EMPTY, 
    {"I983": URL} | EMPTY,
    {"I20": URL}  | EMPTY,
  ];
}
```

#### PUT	/api/visas/:id
Request: `id`: the `_id` of an employee.

Request body:
```typescript
{
  action: "APPROVE" | "REJECT"
  payload: {
    documentType: "OPT|EAD|I983|I20";
    url: "URL";
    feedback?: string;
  };
}
```

## Endpoints open to all employees
GET	/api/profile/me

response body

```typescript
{
  success: true;
  data: IProfileFull;
}
```
PATCH|PUT	/api/profile/me

GET	/api/visa/me
```typescript
{
  success: true;
  data:[{
    I20:{
      status: "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED";
      url? : URL; 
      feedback?:string;
    }},// EAD , I983 , I20
  ];
}
```
PUT	/api/visa/me
Request body:
```typescript
{
  action: "submit",
  documentType: "OPT|EAD|I983|I20";
  url: "URL";
}
```

## Notes
- Response: 204 means
  - Response status: 204
  - Response body: EMPTY

- Visa Status: 

```typescript
"PROGRESS" | "FINISHED" | null | "NA"
```  
After an empolyee register, his visa will be "NA". Because we still have no idea about if the work authorization this employee holds is OPT or not.

After he submit his boarding application, if he holds OPT work authorization, the visa status will tranform to "PROGRESS", otherwise "null". The visa status will change to "FINISHED" until he gets all required documents approved. 
