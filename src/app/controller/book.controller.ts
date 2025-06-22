import express, { NextFunction, Request, Response } from "express";
import { Books } from "../models/book.model";

export const bookRouter = express.Router();

bookRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const book = await Books.create(body);

      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

bookRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get query parameters from the URL
    const filter = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || "createdAt"; // Default to 'createdAt'
    const sort = (req.query.sort as string) || "desc"; // Default to descending
    const limit = Number(req.query.limit) || 10; // Default to 10
    let query = {};

    // If a filter is provided, check if it's a valid genre
    if (filter) {
      const validGenres = [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ];
      if (validGenres.includes(filter)) {
        query = { genre: filter };
      }
    }

    let booksQuery = Books.find(query);
    // sorting
    if (sort === "asc") {
      booksQuery = booksQuery.sort(sortBy); // Ascending
    } else {
      booksQuery = booksQuery.sort(`-${sortBy}`); // Descending
    }
    // limit
    booksQuery = booksQuery.limit(limit);

    // after all the checks finally executes the main query
    const books = await booksQuery;

    if (books.length === 0) {
      throw new Error("No books found !");
    }

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    next(error);
  }
});

bookRouter.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.bookId;
      const books = await Books.findById(id);
      if (books === null) {
        throw new Error("ID is wrong/Not found!");
      }
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }
);

bookRouter.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookID = req.params.bookId;
      const updateBook = req.body;
      const book = await Books.findByIdAndUpdate(bookID, updateBook, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

bookRouter.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookID = req.params.bookId;
      const book = await Books.findByIdAndDelete(bookID, { new: true });
      if (!book) {
        throw new Error("Book not found");
      }

      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);
