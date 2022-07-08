const EnrollmentsServices = require("../services/EnrollmentsServices");

const enrollmentsServices = new EnrollmentsServices();

class EnrollmentsController {
  static async index(req, res) {
    try {
      const enrollments = await enrollmentsServices.getAllRecords();

      return res.status(200).json(enrollments);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const enrollment = await enrollmentsServices.getOneRecord(id);

      if (!enrollment) {
        return res.status(404).send("Enrollment not found.");
      }

      return res.status(200).json(enrollment);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    const data = req.body;

    try {
      const createdEnrollment = await enrollmentsServices.createRecord(data);

      return res.status(201).json(createdEnrollment);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      await enrollmentsServices.updateRecord(id, data);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;

    try {
      await enrollmentsServices.deleteRecord(id);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = EnrollmentsController;
