
# The API of PathFlowEMS Backend (Auth)

The following endpoints open to both HR and employees.

## POST /api/auth/register <a name="register">
<details>
<summary> 功能：新员工注册 </summary>
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
  message: "Congratulations! Your account has been successfully created!";
  data: {
    username: string;
    profileImage: DEFAULT_PROFILE_IMAGE_URL; //"https://api.dicebear.com/9.x/bottts/png" 
    employeeId: string;
    accessToken: string;
    role: "USER" | "AMDIN";
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
  message: "Successfully logged in!";
  data: {
    username: string;
    profileImage: URL | DEFAULT_PROFILE_IMAGE_URL; 
    employeeId: string;
    accessToken: string;
    role: "USER" | "AMDIN";
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

