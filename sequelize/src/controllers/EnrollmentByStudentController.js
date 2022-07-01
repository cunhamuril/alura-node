const database = require("../db/models");

class EnrollmentByStudentController {
  static async index(req, res) {
    const { studentId } = req.params;

    try {
      const enrollment = await database.Enrollment.findAll({
        where: { studentId },
        include: { model: database.Class, as: "class" },
      });

      if (!enrollment) {
        return res.status(404).send("Enrollment not found.");
      }

      return res.status(200).json(enrollment);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    const { studentId, enrollmentId } = req.params;

    try {
      const enrollment = await database.Enrollment.findOne({
        where: { id: enrollmentId, studentId },
      });

      if (!enrollment) {
        return res.status(404).send("Enrollment not found.");
      }

      return res.status(200).json(enrollment);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = EnrollmentByStudentController;
