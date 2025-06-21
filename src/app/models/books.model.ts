import { model, Schema } from "mongoose";
import { BookStaticMethods, IBooks } from "../interfaces/books.interface";

// Schema
const bookSchema = new Schema<IBooks, BookStaticMethods>(
  {
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
      unique:[true,"isbn number should be unique.Your isbn number {VALUE} is already in the database"]
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

 bookSchema.static('deductCopies',async function (bookId:string,quantity:number) {
    const book = await this.findById(bookId)
    if(!book){
        throw new Error("Book not found");
        
    }
    if(book.copies < quantity){
        throw new Error("Not enough copy available");
        
    }
    book.copies -= quantity

    if(book.copies ===0){
        book.available = false
    }

    await book.save()
    return book

})


bookSchema.pre('save',async function(){
    this.available = this.copies > 0
})

// Model

export const Book = model<IBooks,BookStaticMethods>("Book", bookSchema);
