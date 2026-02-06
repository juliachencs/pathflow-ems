
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

| Method | Category     | Role  | Endpoint                  | 
| ------ | ------------ | ----- | ------------------------- | 
| POST   | AUTH         | ANY   | [/api/auth/register](#register)      | 
| POST   | AUTH         | ANY   | [/api/auth/login](#login)           |
| POST   | AUTH         | ANY   | /api/auth/signout         |
| GET    | REGISTRATION | ADMIN | /api/registration/history |
| POST   | REGISTRATION | ADMIN | /api/registration/invite  |
| GET    | BOARDING     | ADMIN | /api/boarding             |
| GET    | BOARDING     | ADMIN | /api/boarding/:status     |
| GET    | VISA         | ADMIN | /api/visa/                |
| GET    | VISA         | ADMIN | /api/visa/:status         |
| GET    | PROFILE      | ADMIN | /api/profile/:id          |
| GET    | BOARDING     | ADMIN | /api/boarding/:id         |
| PUT    | BOARDING     | ADMIN | /api/boarding/:id         |
| GET    | VISA         | ADMIN | /api/visa/:id             |
| PUT    | VISA         | ADMIN | /api/visa/:id             |
| GET    | PROFILE      | USER  | /api/profile/me           |
| PUT    | PROFILE      | USER  | /api/profile/me           |
| GET    | VISA         | USER  | /api/visa/me              |
| PUT    | VISA         | USER  | /api/visa/me              |

## AUTH

### POST /api/auth/register <a name="register">

Request Body:
```typescript
{
  username: string;
  password: string;
  email: string;
  token: string;
}
```

Response Body:
```typescript
{
  success: true;
  data: {
    role: "USER" | "AMDIN",
    accessToken: string;
    employeeId: string;
  }
}
```

### POST /api/auth/login  <a name="login">


