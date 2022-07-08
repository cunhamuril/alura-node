const PeopleServices = require("../services/PeopleServices");

const peopleServices = new PeopleServices();

class PeopleEnrollmentsController {
  static async index(req, res) {
    const { studentId } = req.params;

    try {
      const enrollments = await peopleServices.getAllEnrollmentsByStudent(
        studentId
      );

      if (!enrollments) {
        return res.status(404).send("Enrollment not found.");
      }

      return res.status(200).json(enrollments);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    const { studentId, enrollmentId } = req.params;

    try {
      const enrollment = await peopleServices.getOneEnrollmentByStudent(
        studentId,
        enrollmentId
      );

      if (!enrollment) {
        return res.status(404).send("Enrollment not found.");
      }

      return res.status(200).json(enrollment);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PeopleEnrollmentsController;
