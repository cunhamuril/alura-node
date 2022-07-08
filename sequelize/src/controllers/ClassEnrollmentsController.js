const ClassesServices = require("../services/ClassesServices");

const classesServices = new ClassesServices();

class ClassEnrollmentsController {
  static async index(req, res) {
    const { id } = req.params;

    try {
      const enrollments = await classesServices.getClassEnrollments(id);

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
