const database = require("../db/models");

class LevelsController {
  static async index(req, res) {
    try {
      const Levels = await database.Level.findAll();

      return res.status(200).json(Levels);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const Level = await database.Level.findOne({ where: { id } });

      if (!Level) {
        return res.status(404).send("Level not found.");
      }

      return res.status(200).json(Level);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    const Level = req.body;

    try {
      const createdLevel = await database.Level.create(Level);

      return res.status(201).json(createdLevel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const Level = req.body;

    try {
      const requestedLevel = await database.Level.findOne({ where: { id } });

      if (!requestedLevel) {
        return res.status(404).send("Level not found.");
      }

      await database.Level.update(Level, {
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;

    try {
      const requestedLevel = await database.Level.findOne({ where: { id } });

      if (!requestedLevel) {
        return res.status(404).send("Level not found.");
      }

      await database.Level.destroy({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = LevelsController;
