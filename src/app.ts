import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bookRouter } from "./app/controller/book.controller";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/books", bookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello !");
});

export default app;
