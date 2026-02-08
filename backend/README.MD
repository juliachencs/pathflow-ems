
# PathFlowEMS-Backend

PathFlowEMS is a full-stack Employee Management System designed to handle dynamic onboarding workflows and multi-stage approval pipelines. This repository contains the lightweight, high-performance backend server.

## Features

- Mail Engine: Integrated Nodemailer support for secure invitation delivery.
- JWT Authentication: Stateless security using JSON Web Tokens.
- Strict Type Safety: Built with TypeScript to ensure reliability in multi-stage pipelines.

## Installation

```bash
git clone  https://github.com/juliachencs/pathflow-ems/tree/dev-phase1-backend
cd backend
npm install
```
 
## Running the Server
Put the .env file under the current folder and run the command:

```bash
npm run dev       # start development server
```

The server will be available at: http://localhost:5200


## Tech Stack
- Framework: Express.js
- Language: TypeScript
- Database: Mongoose
- Mail: Nodemailer
- Auth: JWT (JsonWebToken)


