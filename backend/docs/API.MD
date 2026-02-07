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