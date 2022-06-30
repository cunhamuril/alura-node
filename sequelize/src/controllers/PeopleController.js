const database = require("../db/models");

class PeopleController {
  static async index(req, res) {
    try {
      const people = await database.person.findAll();

      return res.status(200).json(people);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const person = await database.person.findOne({ where: { id } });

      if (!person) {
        return res.status(404).send("Person not found.");
      }

      return res.status(200).json(person);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    const person = req.body;

    try {
      const createdPerson = await database.person.create(person);

      return res.status(201).json(createdPerson);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const person = req.body;

    try {
      const requestedPerson = await database.person.findOne({ where: { id } });

      if (!requestedPerson) {
        return res.status(404).send("Person not found.");
      }

      await database.person.update(person, {
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
      const requestedPerson = await database.person.findOne({ where: { id } });

      if (!requestedPerson) {
        return res.status(404).send("Person not found.");
      }

      await database.person.destroy({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PeopleController;
