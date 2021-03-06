import express from "express";

import BooksController from "../controllers/booksController.js";
import BooksByPublisherController from "../controllers/booksByPublisherController.js";

const router = express.Router();

router.get("/books", BooksController.index);
router.get("/books/search", BooksByPublisherController.index);
router.get("/books/:id", BooksController.show);
router.post("/books", BooksController.store);
router.put("/books/:id", BooksController.update);
router.delete("/books/:id", BooksController.destroy);

export default router;
