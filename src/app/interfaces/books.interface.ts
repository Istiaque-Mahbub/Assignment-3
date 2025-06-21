import { Model } from "mongoose";

export interface IBooks {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BookStaticMethods extends Model<IBooks>{
    deductCopies(bookId:string,quantity:number):Promise<IBooks>
}
