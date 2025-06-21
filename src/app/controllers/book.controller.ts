import express, { Request, Response } from "express"
import { z } from "zod"
import { Book } from "../models/books.model"

export const booksRoute = express.Router()

const createBookZodSchema = z.object({
   title:z.string(),
   author:z.string(),
   genre:z.string(),
    isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean(),
})

const updatedBookZodSchema = z.object({
   title:z.string(),
   author:z.string(),
   genre:z.string(),
    isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean(),
})

//post book
booksRoute.post("/",async(req:Request,res:Response)=>{
 try {
       const body = await createBookZodSchema.parseAsync(req.body)

       const uniqueIsbn = await Book.findOne({isbn:body.isbn})
       if(uniqueIsbn){
  res.status(409).json({
        
  "success": false,
  "message": "Isbn must be unique",
    })
       }

    const book = await Book.create(body)

    res.status(201).json({
        success:true,
        massage:"Book created successfully",
        data:book
    })
 } catch (error:any) {
    console.log(error)
     res.status(409).json({
        "message": "Validation failed",
  "success": false,
  error
    })
 }
})

//get all books
booksRoute.get('/',async(req:Request,res:Response)=>{
    ///api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
    const {filter,sortBy,sort,limit} = req.query
    let query={}
    if(filter){
        query = {genre:filter}
    }
    const books = await Book.find().sort({sortBy : sort == 'asc' ? 1 : -1} ).limit(Number(limit) || 10)

    res.status(201).json({
        success:true,
        massage:"All the books",
        data:books
    })
})

//get books by id
booksRoute.get('/:bookId',async(req:Request,res:Response)=>{
    const id = req.params.bookId

    const book = await Book.findById(id)

    res.status(201).json({
        success:true,
        massage:"Book found!!",
        data:book
    })
})

//update book by id
booksRoute.put('/:bookId',async(req:Request,res:Response)=>{
    const id = req.params.bookId
    const updateBook = await updatedBookZodSchema.parseAsync(req.body)
    const book = await Book.findByIdAndUpdate(id,updateBook,{new:true})

    res.status(201).json({
        success:true,
        massage:`${book?.title} updated`,
        data:book
    })
})

//delete by id
booksRoute.delete('/:bookId',async(req:Request,res:Response)=>{
   const id = req.params.bookId

   const book = await Book.findByIdAndDelete(id)

   res.status(201).json({
      "success": true,
  "message": "Book deleted successfully",
  "data": null
   })
})