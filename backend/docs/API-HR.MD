# The API of PathFlowEMS Backend (HR)

The following endpoints only open to HR users.

## Profiles 

### GET /api/profiles	<a name="hr_profiles">
<details>
<summary>Get all employees' profile summary</summary>
Response body:

```typescript
{
  success: true;
  data: IProfileSummary[];
}
```
</details>

### GET /api/profiles/:id <a name="hr_profile">

<details>
<summary> Get the full profile of an employee </summary>
Query Parameter: `id` is the `_id` field of the employee.

Response body:
```typescript
{
  success: true;
  data: IProfileFull;
}
```
</details>

## Registrations
#### GET /api/registrations/history  <a name="history">
<details>
<summary> Get the registration history </summary>

Response body:
```typescript
{
  success: true;
  data: [{
      name: string;
      email: string;
      registerToken: string;
      createAt: string;
      expireAt: string;
  }]
}
```
</details>

#### POST /api/registrations/invite <a name="invite">
<details>
<summary> Request to send out registration invitation</summary>

Request body:

```typescript
{
  name: string;
  email: string;
}
```

Response: The updated registration history

```typescript
{
  success: true;
  data: [{
      name: string;
      email: string;
      registerToken: string;
      createAt: string;
  }]
}
```

</details>

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
  data: IBoardingApplication;
}
```

</details>

### PATCH /api/boardings/:id

<details>
<summary> Requested to approve or reject the boarding application of an employee. </summary>
Request: `id` is the `_id` of an employee.

Request body: `IBoardingReviewAction`

Response body: the updated list.
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

## VISA Status Management

### GET /api/visas/progress

<details>
<summary> Get the progess of OPT employees who are submitting their visa documents </summary>
Response body

```typescript
{
  success: true;
  data: IManagedVisaStatus[];
}
```

</details>

### GET /api/visas/all

<details>
<summary> Get the visa status of all OPT employees </summary>

Response body
```typescript
{
 success: true;
 data: IManagedVisaStatus[];
}
```
</details>

### PATCH	/api/visas/:id

Request: `id`: the `_id` of an employee.

Request body: `IVisaReviewAction`;

Response body
```typescript
{
  success: true;
  data: {
    progress: IManagedVisaStatus[];
    all: IManagedVisaStatus[];
  }
}
```