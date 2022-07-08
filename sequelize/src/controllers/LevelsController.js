const LevelsServices = require("../services/LevelsServices");

const levelsServices = new LevelsServices();

class LevelsController {
  static async index(req, res) {
    try {
      const Levels = await levelsServices.getAllRecords();

      return res.status(200).json(Levels);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const Level = await levelsServices.getOneRecord(id);

      if (!Level) {
        return res.status(404).send("Level not found.");
      }

      return res.status(200).json(Level);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    const data = req.body;

    try {
      const createdLevel = await levelsServices.createRecord(data);

      return res.status(201).json(createdLevel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      await levelsServices.updateRecord(id, data);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;

    try {
      await levelsServices.deleteRecord(id);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = LevelsController;
