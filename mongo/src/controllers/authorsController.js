import Authors from "../models/Author.js";

class AuthorsController {
  static index = (req, res) => {
    Authors.find((err, authors) => {
      res.status(200).json(authors);
    });
  };

  static show = (req, res) => {
    const { id } = req.params;

    Authors.findById(id, (err, authors) => {
      if (err) {
        res.status(404).send({
          message: `${err.message} - Author not found`,
        });
      }

      res.status(200).json(authors);
    });
  };

  static store = (req, res) => {
    const author = new Authors(req.body);

    author.save((err) => {
      if (err) {
        res.status(500).send({
          message: `${err.message} - Create author fail`,
        });

        return;
      }

      res.status(201).send(author.toJSON());
    });
  };

  static update = (req, res) => {
    const { id } = req.params;

    Authors.findByIdAndUpdate(id, { $set: req.body }, (err, author) => {
      if (err) {
        res.status(500).send({
          message: `${err.message} - Update author fail`,
        });

        return;
      }

      res.status(200).json({ ...author._doc, ...req.body });
    });
  };

  static destroy = (req, res) => {
    const { id } = req.params;

    Authors.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).send({
          message: `${err.message} - Delete author fail`,
        });

        return;
      }

      res.status(200).json({ message: `Author ${id} deleted successfully` });
    });
  };
}

export default AuthorsController;
