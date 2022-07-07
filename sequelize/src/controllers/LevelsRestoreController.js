const database = require("../db/models");

class LevelsRestoreController {
  static async store(req, res) {
    const { id } = req.params;

    try {
      await database.Level.restore({ where: { id } });

      return res.status(200).json({ message: `id ${id} restored` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = LevelsRestoreController;
