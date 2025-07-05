import express, { Application, Request, Response } from "express";
import { booksRoute } from "./app/controllers/book.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";
import cors from 'cors'

const app: Application = express();

app.use(express.json());
app.use(cors({origin:["http://localhost:5173","https://library-management-frontend-six.vercel.app"]}))

app.use('/api/books',booksRoute)
app.use('/api/borrow',borrowRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Library management system ");
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

export default app;
