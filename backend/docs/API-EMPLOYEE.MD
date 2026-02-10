# The API of PathFlowEMS Backend (Employee)

The following endpoints only open to employee users.

## Profile
### GET /api/profile/me
功能：获取员工的完整信息

Response:

```Javascript
{
  success: true;
  data: IProfileFull;
}
```

### PUT /api/profile/me	
功能：更新员工的信息

Request body: `IProfile` | `Omit<IProfileFull, "_id">`

Response: updated profile

```Javascript
{
  success: true;
  message: string;
  data: IProfileFull; // the update profile 
}
```

The server will use the employee ID decoded from the request header by default.


## Boarding
### POST /api/boarding/me	
功能： submit the boarding application

Request body: `IProfile`

Response body:

```typescript
{
  success: true;
  data: IBoardingApplication;
}
```

### PUT	/api/boarding/me	
功能：re-submit updated boarding application

Request body: `IProfile`

Response body:

```typescript
{
  success: true;
  data: IBoardingApplication;
}
```

### GET /api/boarding/me	
功能：get the boarding application

Response body:

```typescript
{
  success: true;
  data: IBoardingApplication;
}
```

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


