import books from "../models/Book.js";
import Books from "../models/Book.js";

class BookController {
  static index = (req, res) => {
    Books.find((err, books) => {
      res.status(200).json(books);
    });
  };

  static show = (req, res) => {
    const { id } = req.params;

    Books.findById(id, (err, books) => {
      if (err) {
        res.status(404).send({
          message: `${err.message} - Book not found`,
        });
      }

      res.status(200).json(books);
    });
  };

  static store = (req, res) => {
    const book = new Books(req.body);

    book.save((err) => {
      if (err) {
        res.status(500).send({
          message: `${err.message} - Create book fail`,
        });

        return;
      }

      res.status(201).send(book.toJSON());
    });
  };

  static update = (req, res) => {
    const { id } = req.params;

    books.findByIdAndUpdate(id, { $set: req.body }, (err, book) => {
      if (err) {
        res.status(500).send({
          message: `${err.message} - Update book fail`,
        });

        return;
      }

      res.status(200).json({ ...book._doc, ...req.body });
    });
  };

  static destroy = (req, res) => {
    const { id } = req.params;

    books.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).send({
          message: `${err.message} - Delete book fail`,
        });

        return;
      }

      res.status(200).json({ message: `Book ${id} deleted successfully` });
    });
  };
}

export default BookController;
