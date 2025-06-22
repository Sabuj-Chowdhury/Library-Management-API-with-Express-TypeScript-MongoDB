import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { bookRouter } from "./app/controller/book.controller";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/books", bookRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      success: true,
      message:
        "Welcome to Library Management API with Express, TypeScript & MongoDB!",
    });
  } catch (error) {
    next(error);
  }
});

// if no path is matched then->
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ success: false, message: "Route not found" });
});

// GLOBAL error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
      error: err,
    });
  }
});

export default app;
