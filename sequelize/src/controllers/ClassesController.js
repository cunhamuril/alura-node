const ClassesServices = require("../services/ClassesServices");

const classesServices = new ClassesServices();

class ClassesController {
  static async index(req, res) {
    const { initialDate, finalDate } = req.query;

    try {
      const classes = await classesServices.getAllRecords({
        initialDate,
        finalDate,
      });

      return res.status(200).json(classes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const classData = await classesServices.getOneRecord(id);

      if (!classData) {
        return res.status(404).send("Class not found.");
      }

      return res.status(200).json(classData);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    const data = req.body;

    try {
      const createdClass = await classesServices.createRecord(data);

      return res.status(201).json(createdClass);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      await classesServices.updateRecord(id, data);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;

    try {
      await classesServices.deleteRecord(id);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ClassesController;
