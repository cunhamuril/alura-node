const database = require("../db/models");

class EnrollmentsController {
  static async index(req, res) {
    try {
      const Enrollments = await database.Enrollment.findAll({
        include: [
          { model: database.Class, as: "class" },
          { model: database.Person, as: "student" },
        ],
      });

      return res.status(200).json(Enrollments);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const Enrollment = await database.Enrollment.findOne({
        where: { id },
        include: [
          { model: database.Class, as: "class" },
          { model: database.Person, as: "student" },
        ],
      });

      if (!Enrollment) {
        return res.status(404).send("Enrollment not found.");
      }

      return res.status(200).json(Enrollment);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    const Enrollment = req.body;

    try {
      const createdEnrollment = await database.Enrollment.create(Enrollment);

      return res.status(201).json(createdEnrollment);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const Enrollment = req.body;

    try {
      const requestedEnrollment = await database.Enrollment.findOne({
        where: { id },
      });

      if (!requestedEnrollment) {
        return res.status(404).send("Enrollment not found.");
      }

      await database.Enrollment.update(Enrollment, {
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
      const requestedEnrollment = await database.Enrollment.findOne({
        where: { id },
      });

      if (!requestedEnrollment) {
        return res.status(404).send("Enrollment not found.");
      }

      await database.Enrollment.destroy({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = EnrollmentsController;
