const EnrollmentsServices = require("../services/EnrollmentsServices");

const enrollmentsServices = new EnrollmentsServices();

class EnrollmentsRestoreController {
  static async store(req, res) {
    const { id } = req.params;

    try {
      await enrollmentsServices.restoreRecord(id);

      return res.status(200).json({ message: `id ${id} restored` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = EnrollmentsRestoreController;
