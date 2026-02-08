import express from "express";
import cors from "cors";
import apiRouter from "@/routes/index";
import errorHandler from "@/middlewares/error-handler";

const app = express();
app.use(cors());
app.use(express.json());

// I am not sure, we will really need this middleware
app.use(express.urlencoded({ extended: true }));

// for simple testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// the api router
app.use("/api", apiRouter);

// handle a 404 response:
app.use((req, res, next) => {
  res.status(404).send(`Sorry can't find: ${req.originalUrl}.`);
});

// handle errors
app.use(errorHandler);
export default app;
