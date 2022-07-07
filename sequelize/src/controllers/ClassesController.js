const database = require("../db/models");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

class ClassesController {
  static async index(req, res) {
    const { initialDate, finalDate } = req.query;

    try {
      const where = {};

      if (initialDate || finalDate) {
        where.startDate = {};

        if (initialDate) where.startDate[Op.gte] = initialDate; // gte => greater then or equal
        if (finalDate) where.startDate[Op.lte] = finalDate; // lte => less then or equal
      }

      const Classes = await database.Class.findAll({
        include: [
          { model: database.Person, as: "teacher" },
          { model: database.Level, as: "level" },
        ],
        where,
      });

      return res.status(200).json(Classes);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const Class = await database.Class.findOne({
        where: { id },
        include: [
          { model: database.Person, as: "teacher" },
          { model: database.Level, as: "level" },
        ],
      });

      if (!Class) {
        return res.status(404).send("Class not found.");
      }

      return res.status(200).json(Class);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    const Class = req.body;

    try {
      const createdClass = await database.Class.create(Class);

      return res.status(201).json(createdClass);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const Class = req.body;

    try {
      const requestedClass = await database.Class.findOne({
        where: { id },
        include: [
          { model: database.Person, as: "teacher" },
          { model: database.Level, as: "level" },
        ],
      });

      if (!requestedClass) {
        return res.status(404).send("Class not found.");
      }

      await database.Class.update(Class, {
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;

    try {
      const requestedClass = await database.Class.findOne({ where: { id } });

      if (!requestedClass) {
        return res.status(404).send("Class not found.");
      }

      await database.Class.destroy({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ClassesController;
