const LevelsServices = require("../services/LevelsServices");

const levelsServices = new LevelsServices();

class LevelsRestoreController {
  static async store(req, res) {
    const { id } = req.params;

    try {
      await levelsServices.restoreRecord(id);

      return res.status(200).json({ message: `id ${id} restored` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = LevelsRestoreController;
