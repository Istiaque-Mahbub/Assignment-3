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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
// Schema
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, "isbn number should be unique.Your isbn number {VALUE} is already in the database"]
    },
    description: { type: String, default: "" },
    copies: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.static('deductCopies', function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        if (book.copies < quantity) {
            throw new Error("Not enough copy available");
        }
        book.copies -= quantity;
        if (book.copies === 0) {
            book.available = false;
        }
        yield book.save();
        return book;
    });
});
bookSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.available = this.copies > 0;
    });
});
// Model
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
