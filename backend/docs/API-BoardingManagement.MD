
## Data interface 

The information of each employee
```typescript
export interface IProfileCore {
  employeeId: string;
  fullName: string;
  email: string;
  name: IName;
}
```

```typescript
export interface IReviewBoardingAction {
  employeeId: string;
  actionType: "APPROVE" | "REJECT";
  payload: {
    feedback?: string;
  };
}
```

## OnBoarding Application Review 

### GET /api/boardings
<details>
<summary> List all onboarding employees </summary>

Response body:

```typescript
{
  success: true;
  data: {
    PENDING: IProfileCore[];
    REJECTED: IProfileCore[];
    APPROVED: IProfileCore[];
  }
}
```

</details>

### GET /api/boardings?state=state
<details>
<summary> List all onboarding employees in certain state </summary>

Response body:

```typescript
{
  success: true;
  message: string;
  data: IProfileCore[];
}
```

</details>

### GET /api/boardings/:id

<details>
<summary> Get the boarding application of an employee. </summary>

Request: `id`: the `_id` of an employee 

Response body:

```typescript
{
  success: true;
  message: string;
  data: IBoardingApplication;
}
```

</details>

### PATCH /api/boardings/:id

<details>
<summary> Requested to approve or reject the boarding application of an employee. </summary>
Request: `id` is the `_id` of an employee.

Request body: `IReviewBoardingAction`

Response body: the updated list.
```typescript
{
  success: true;
  message: string;
  data: {
    PENDING: IProfileCore[];
    REJECTED: IProfileCore[];
    APPROVED: IProfileCore[];
  }
}
```
</details>
