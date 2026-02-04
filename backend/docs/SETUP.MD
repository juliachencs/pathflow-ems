## Setup 


1. Initialize a New Node.js Project.
    Use npm init to initialize a new Node.js project. This will generate a `package.json` file, which will store metadata about the project and its dependencies. and then update the main field to `sever.ts`.

   ```bash
   npm init -y
   npm pkg set main=server.ts
   ```
   Make sure the first paragraph in `README.MD` contains the description of the project. npm init will use it the set the `description` in  `package.json`.

2. Install Dependencies.

   Install the necessary dependencies for our project.

   ```bash
   # dependencies 
   npm install express cors dotenv mongoose nodemailer

   # development dependencies 
   npm install -D tsx typescript @types/cors @types/nodemailer @types/mongoose @types/node @types/express

   ```

   Lets briefly look what each dependency does.

   - `express`: The web framework for Node.js that we'll use to build our server.
   - `cors` : Cross-Origin Resource Sharing to allow cross-origin requests and ensure that our backend APIs can be accessed securely from the client despite running on different ports.
   - `dotenv`: Loads environment variables from .env file.
   - `mongoose`: Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
   - `nodemailer`: Nodemailer is the most popular email sending library for Node.js. It makes sending emails straightforward and secure, with zero runtime dependencies to manage.

3. Configure TypeScript

   Create a tsconfig.json file to configure TypeScript. This file specifies how TypeScript should compile our code. Run npx tsconfig.json then select Node. This command generates a tsconfig.json file with some default settings.
   ```bash
   npx tsc --init
   ```

4. Define the dev script
   
   Define the dev script in `package.json`. Open `package.json` file and modify the scripts section to include a dev command that uses tsx to run your main TypeScript file. Add the watch argument to automatically re-run on file changes.

   ```json
   "scripts": {
       // ... other command
       "dev": "tsx watch --include ./src ./src/server.ts"
   }
   ```
5. Update the `tsconfig` config to support the absolute path import without file extension.

  ```json
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "es2020",
    "target": "esnext",
    "types": ["node"],
    "moduleResolution": "bundler",
    
    // ...
  }
  ```


6. Create the src/app.ts and server.ts script
  
  
  ```typescript
  //app.ts
   import express from 'express';
   import cors from 'cors';

   const app = express();

   app.use(cors());
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   app.get('/', (req, res) => {
     res.send('Hello World!')
   })

   export default app;
  ```

  ```typescript
  // server.ts
   import app from "@/app";
   import "dotenv/config";

   const PORT = process.env.PORT || 5200;
   const start = (async () => {
     app.listen(PORT, () => {
       console.log(`Server listening on port ${PORT}`);
     });
   })();
  ```

7. Run the server
  
  In the vscode terminal, start the server with the following command:

  ```bash
  npm run dev
  # > backend@1.0.0 dev
  # > tsx watch --include ./src ./src/server.ts
  # Server listening on port 5200
  ```

8. Test with Postman  

## References 
(generator: bibciation.com MLA8)

McIntyre, Monique. “Setting up an Express + Typescript Server with Vue + Vite.” Medium, 22 Mar. 2024, https://medium.com/@ctrlaltmonique/setting-up-an-express-typescript-server-with-vue-vite-9d415a51facc.
