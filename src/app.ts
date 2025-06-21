import express, { Application, Request, Response } from "express";
import { booksRoute } from "./app/controllers/book.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(express.json());

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
