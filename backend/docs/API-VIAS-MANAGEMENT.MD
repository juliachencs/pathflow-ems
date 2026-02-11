# Interface

```Typescript
export interface IName {
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
}


export const VisaDocumentTypes = ["OPT", "EAD", "I983", "I20"] as const;
export type VisaDocumentType = (typeof VisaDocumentTypes)[number];

export interface IVisaFiles {
  OPT?: string;
  EAD?: string;
  I983?: string;
  I20?: string;
}


export interface IManagedVisaStatus {
  employeeId: string;
  name: IName;
  workAuthorization: {
    title: string;
    startDate: string;
    endDate: string;
  };
  nextStep: string; // "Waiting for approval" or "Waiting for OPT|EAD.." or "Done"
  action:
     {
        actionType: "REVIEW" | "SEND_NOTIFICATION";
        payload: {
          documentType: VisaDocumentType;
          url?: string;
        };
      }
    | {};

  files: IVisaFiles;
}
```


# GET  /api/visas/progress        
功能：获取所有未完成OPT文件审核的OPT员工的visa状态

Response body:

```typescript
{
  success: true,
  message: "You've got all employees who have not complete their visa document upload";
  data: IManagedVisaStatus[], 

}
```


# GET  /api/visas/all

# 获取所有OPT员工的visa状态 

Response body:

```typescript
{
  success: true,
  message: "You've got all employees' visa status",
  data: IManagedVisaStatus[], 
}
```

# PATCH  /api/visas/:id             
功能：对某个员工的visa document进行Reject/Approve/send notification操作 

Request body

```typescript
export interface IReviewVisaAction {
  actionType: "APPROVE" | "ACCEPT" | "SEND_NOTIFICATION";
  payload: {
    documentType: VisaDocumentType;
    url?: string;
    feedback?: string;
  };
}
```

<details>
<summary>说明</summary>

HR可以对某个员工(employeeId)的visa文档进行三种操作， 
- Approve the document 这种时候需要提供以下数据：

```typescript
{
  actionType: "APPROVE";
  payload: {
    documentType: VisaDocumentType;
    url: string;
  };
}
```

- Reject the document
```typescript
{
  actionType: "REJECT";
  payload: {
    documentType: VisaDocumentType;
    url: string;
    feedback: string;
  };
}
```

- Send notification
```typescript
{
  actionType: "SEND_NOTIFICATION";
  payload: {
    documentType: VisaDocumentType;    
  };
}
```
</details>

Response body:
```typescript
{
  success: true,
  message: "You've reivewed the visa document",
  data: { 
    all: IManagedVisaStatus[], 
    progress: IManagedVisaStatus[],
  },
}
```
