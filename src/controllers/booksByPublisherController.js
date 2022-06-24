import Books from "../models/Book.js";

class BooksByPublisherController {
  static index = (req, res) => {
    const { publisher } = req.query;

    Books.find({ publisher }, {}, (err, books) => {
      if (err) {
        res.status(404).send({
          message: `${err.message} - Books not found`,
        });
      }

      res.status(200).send(books);
    });
  };
}

export default BooksByPublisherController;
