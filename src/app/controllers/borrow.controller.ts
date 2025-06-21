import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { Borrow } from "../models/borrow.model";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    await Book.deductCopies(body.book, body.quantity);

    const borrowBook = await Borrow.create(body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowBook,
    });
  } catch (error) {
    res.status(401).json({
      success: true,
      message: "Something wrong please check book_id properly",
      error,
    });
  }
});

borrowRouter.get("/", async (req: Request, res: Response) => {
//   const borrowBooks = await Borrow.find().populate({
//     path: "book",
//     select: "title isbn -_id",
//   });
const borrowBooks = await Borrow.aggregate([
  {
    $group: {
      _id: '$book',
      totalQuantity: { $sum: '$quantity' }
    }
  },
  {
    $lookup: {
      from: 'books',
      localField: '_id',
      foreignField: '_id',
      as: 'book'
    }
  },
  {
    $unwind: '$book'
  },
  {
    $project: {
      
      totalQuantity: 1,
      book: {
        title: '$book.title',
        isbn: '$book.isbn'
      }
    }
  }
]);

  res.status(201).json({
    success: true,
    massage: "All borrow books",
    data: borrowBooks,
  });
});
