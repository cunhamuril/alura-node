const database = require("../db/models");

class EnrollmentsRestoreController {
  static async store(req, res) {
    const { id } = req.params;

    try {
      await database.Enrollment.restore({ where: { id } });

      return res.status(200).json({ message: `id ${id} restored` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = EnrollmentsRestoreController;
