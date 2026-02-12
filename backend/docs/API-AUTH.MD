
# The API of PathFlowEMS Backend (Auth)

The following endpoints open to both HR and employees.

## POST /api/auth/register <a name="register">
<details>
<summary> 功能：新员工注册 </summary>
Request body:

```typescript
{
  username: string;
  password: string;
  email: string;
  registerToken: string;
}
```

Response body:

```typescript
{
  success: true;
  message: "Congratulations! Your account has been successfully created!";
  data: {
    username: string;
    profileImage: ""; 
    employeeId: string;
    accessToken: string;
    role: "USER" | "ADMIN";
    boarding:  "UNSUBMIT";
    visa: "NA"
  }
}
```
</details>

## POST /api/auth/login  <a name="login">

<details>
<summary> 功能：用户登录 </summary>
Request body:

```typescript
{
  username: string;
  password: string;
}
```

Response body:

```typescript
{
  success: true;
  message: "You have successfully logged in!";
  data: {
    username: string;
    profileImage: string; // the url to profile image  
    employeeId: string;
    accessToken: string;
    role: "USER" | "ADMIN";
    boarding:  "UNSUBMIT" | "PENDING" | "REJECTED" | "APPROVED" ;
    visa: "PROGRESS" | "FINISHED" | null | "NA"; 
  }
}
```
</details>

## POST /api/auth/signout  <a name="signout">
<details>
<summary> 功能：用户登出 </summary>

- Request Header: accessToken
- Request body: EMPTY
- Response: 204
  
</details>

