# API


## Endpoints
| Method | Category     | Role  | Endpoint                   | 功能                                                                                  |
| ------ | ------------ | ----- | -------------------------- | ------------------------------------------------------------------------------------- |
| POST   | AUTH         | ANY   | /api/auth/register         | 注册                                                                                  |
| POST   | AUTH         | ANY   | /api/auth/login            | 登录                                                                                  |
| POST   | AUTH         | ANY   | /api/auth/signout          | 登出                                                                                  |
| GET    | PROFILE      | ADMIN | /api/profiles              | 获取所有员工的“基本信息”(profile summary)                                             |
| GET    | PROFILE      | ADMIN | /api/profiles/:id          | 获取某个员工“完整信息”(profile)                                                       |
| GET    | REGISTRATION | ADMIN | /api/registrations/history | 查看registration history                                                              |
| POST   | REGISTRATION | ADMIN | /api/registrations/invite  | 请求发送registration link                                                             |
| GET    | BOARDING     | ADMIN | /api/boardings             | 直接返回所有的{PENDING, REJECTED, APPROVED}员工的“核心信息”                           |
| GET    | BOARDING     | ADMIN | /api/boardings?state=      | 直接返回所有的PENDING\|REJECTED\|APPROVED员工的“核心信息”                             |
| GET    | BOARDING     | ADMIN | /api/boardings/:id         | 获取某位员工的boarding application                                                    |
| PATCH  | BOARDING     | ADMIN | /api/boardings/:id         | Reject/Approve 某位处在boarding pending状态员工的boarding application                 |
| GET    | VISA         | ADMIN | /api/visas/all             | 获取所有OPT员工的visa状态                                                             |
| GET    | VISA         | ADMIN | /api/visas/progress        | 获取所有未完成OPT文件审核的OPT员工的visa状态                                          |
| PATCH  | VISA         | ADMIN | /api/visas/:id             | 对某个员工的visa document进行Reject/Approve/send notification操作 / send notification |
| GET    | PROFILE      | USER  | /api/profile/me            | 获取员工的完整信息                                                                    |
| PUT    | PROFILE      | USER  | /api/profile/me            | 更新员工的信息                                                                        |
| POST   | BOARDING     | USER  | /api/boarding/me           | submit boarding application                                                           |
| PUT    | BOARDING     | USER  | /api/boarding/me           | re-submit boarding application                                                        |
| GET    | BOARDING     | USER  | /api/boarding/me           | 获取员工的boarding application                                                        |
| GET    | VISA         | USER  | /api/visa/me               | 获取员工的visa信息                                                                    |
| PATCH  | VISA         | USER  | /api/visa/me               | 提交OPT/EAD/I983/I20文件链接                                                          |


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

### Profile相关的interfaces和types <a name="Profile">
用户的profile和boarding data非常类似，只是多了visa files的列表
```typescript

// 这个是给employee 看自己的profile
export interface IProfile extends IBoardingData {
  files: IVisaFiles; 
}

// interface for HR-Employee Profiles Page
export interface IProfileSummary {
  employeeId: string;
  fullName: string;
  name: IName;
  SSN: string;
  workAuthorization: IWorkAuthorization;
  cellPhone: string;
  email: string;
}
```



### VISA 相关的interfaces和types 

1. 定义visa文件的种类
  
```typescript
// document types
export const VisaDocumentTypes = ["OPT", "EAD", "I983", "I20"] as const;
export type VisaDocumentType = (typeof VisaDocumentTypes)[number];
```

2. 用户已上传的文件列表

```typescript
// file list 
export interface IVisaFiles {
  OPT?: string;
  EAD?: string;
  I983?: string;
  I20?: string;
}
```

3. 单个visa 文件当前的状态（不仅仅是file，还包括了审核的信息）
```typescript
// document status
export const ApplyStates = [
  "UNSUBMIT",
  "PENDING",
  "REJECTED",
  "APPROVED",
] as const;

export type ApplyState = (typeof ApplyStates)[number];

export interface IDocumentState {
  state: ApplyState;
  documentType: VisaDocumentType;
  feedback?: string;
  url?: string;
}
```

4. 整个visa的状态（当前整个visa的进度和所需文件的审核状态)
```typescript
// visa status
export interface IVisaStatus {
  state: VisaState;
  curStage?: number;
  documents?: IDocumentState[];
}
```



