import express, { NextFunction, Request, Response } from "express";
import { Books } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRouter = express.Router();

borrowRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { book, quantity, dueDate } = req.body;

      // Validate input
      if (!book || !quantity || !dueDate) {
        throw new Error("Missing required fields: book, quantity, or dueDate");
      }

      // Find the book
      const borrowBook = await Books.findById(book);
      if (!borrowBook) {
        throw new Error("Book not found");
      }

      let borrow;

      if (borrowBook.copies >= quantity) {
        borrow = await Borrow.create(req.body);

        res.status(201).json({
          success: true,
          message: "Book borrowed successfully",
          data: borrow,
        });
      } else throw new Error("Not enough copies to borrow");
    } catch (error) {
      next(error);
    }
  }
);

borrowRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const summary = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "book",
          },
        },
        { $unwind: "$book" },
        {
          $project: {
            book: {
              title: "$book.title",
              isbn: "$book.isbn",
            },
            totalQuantity: 1,
          },
        },
      ]);

      if (summary.length === 0) {
        throw new Error("No borrowed books found");
      }

      res.json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
);
