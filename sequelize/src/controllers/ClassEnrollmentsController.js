const database = require("../db/models");

class ClassEnrollmentsController {
  static async index(req, res) {
    const { id } = req.params;

    try {
      const Class = await database.Class.findOne({
        where: { id },
      });

      const enrollments = await Class.getEnrollments({
        include: [{ model: database.Person, as: "student" }],
        where: { status: "confirmed" },
      });

      // const enrollment = await database.Enrollment.findAll({
      //   where: { studentId },
      //   include: { model: database.Class, as: "class" },
      // });

      if (!enrollments) {
        return res.status(404).send("Enrollment not found.");
      }

      return res.status(200).json(enrollments);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ClassEnrollmentsController;
