"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield books_model_1.Book.deductCopies(body.book, body.quantity);
        const borrowBook = yield borrow_model_1.Borrow.create(body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowBook,
        });
    }
    catch (error) {
        res.status(409).json({
            success: true,
            message: "Something wrong please check book_id properly",
            error,
        });
    }
}));
exports.borrowRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const borrowBooks = await Borrow.find().populate({
    //     path: "book",
    //     select: "title isbn -_id",
    //   });
    const borrowBooks = yield borrow_model_1.Borrow.aggregate([
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
}));
