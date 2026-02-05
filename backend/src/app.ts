import express from "express";
import cors from "cors";
import { rootRouter } from "@/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", rootRouter);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
