import express, { Request, Response } from "express";
import { Books } from "../models/book.model";

export const bookRouter = express.Router();

bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const book = await Books.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Books not created!",
      success: false,
      error: error,
    });
  }
});

bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const books = await Books.find();

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve books",
      error: error,
    });
  }
});
