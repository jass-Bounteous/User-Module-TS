import express, { Application, Request, Response, NextFunction } from "express";

import methodLogger from "./middleware/logger";
import DbConnect from "./dbConfig";
import authRouter from "./routes/authRouter";

const app: Application = express();
app.use(express.json());
app.use(methodLogger);

DbConnect();

app.use("/app", authRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("Try /login or /signup");
  res.status(200).send("Try /login or /signup");
});

app.listen(5000, () => console.log("Server started"));
