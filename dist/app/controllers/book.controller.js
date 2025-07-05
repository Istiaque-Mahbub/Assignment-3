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
exports.booksRoute = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const books_model_1 = require("../models/books.model");
exports.booksRoute = express_1.default.Router();
const createBookZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.string(),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number(),
    available: zod_1.z.boolean(),
});
const updatedBookZodSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    genre: zod_1.z.string().optional(),
    isbn: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number().optional(),
    available: zod_1.z.boolean().optional(),
});
//post book
exports.booksRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield createBookZodSchema.parseAsync(req.body);
        const uniqueIsbn = yield books_model_1.Book.findOne({ isbn: body.isbn });
        if (uniqueIsbn) {
            res.status(409).json({
                "success": false,
                "message": "Isbn must be unique",
            });
        }
        const book = yield books_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            massage: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        console.log(error);
        res.status(409).json({
            "message": "Validation failed",
            "success": false,
            error
        });
    }
}));
//get all books
exports.booksRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ///api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
    const { filter, sortBy, sort, limit } = req.query;
    const query = filter ? { genre: filter } : {};
    // if(filter){
    //     query = { genre: filter };
    // }
    const books = yield books_model_1.Book.find(query).sort({ [sortBy]: sort == 'asc' ? 1 : -1 }).limit(Number(limit) || 10);
    res.status(201).json({
        success: true,
        massage: "All the books",
        data: books
    });
}));
//get books by id
exports.booksRoute.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const book = yield books_model_1.Book.findById(id);
    res.status(201).json({
        success: true,
        massage: "Book found!!",
        data: book
    });
}));
//update book by id
exports.booksRoute.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const updateBook = yield updatedBookZodSchema.parseAsync(req.body);
        const book = yield books_model_1.Book.findByIdAndUpdate(id, updateBook, { new: true });
        res.status(201).json({
            success: true,
            massage: `${book === null || book === void 0 ? void 0 : book.title} updated`,
            data: book
        });
    }
    catch (error) {
        res.status(409).json({
            success: false,
            massage: "Something wrong try again",
        });
    }
}));
//delete by id
exports.booksRoute.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    const book = yield books_model_1.Book.findByIdAndDelete(id);
    res.status(201).json({
        "success": true,
        "message": "Book deleted successfully",
        "data": null
    });
}));
