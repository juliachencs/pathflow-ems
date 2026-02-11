# Interface

```Typescript
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
  fullName: string;
  workAuthorization: {
    title: string;
    startDate: string;
    endDate: string;
  };
  nextStep: string;
  action:
    | {
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
功能：对某个员工的visa document进行Reject/Approve/send notification操作 / send notification

Request body

```typescript
export interface IVisaReviewAction {
  employeeId: string;
  actionType: "APPROVE" | "ACCEPT" | "SEND_NOTIFICATION";
  payload: {
    documentType: VisaDocumentType;
    url?: string;
    feedback?: string;
  };
}
```


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
