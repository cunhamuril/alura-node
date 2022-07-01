const database = require("../db/models");

class PeopleController {
  static async index(req, res) {
    try {
      const People = await database.Person.findAll();

      return res.status(200).json(People);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const Person = await database.Person.findOne({ where: { id } });

      if (!Person) {
        return res.status(404).send("Person not found.");
      }

      return res.status(200).json(Person);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    const Person = req.body;

    try {
      const createdPerson = await database.Person.create(Person);

      return res.status(201).json(createdPerson);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const Person = req.body;

    try {
      const requestedPerson = await database.Person.findOne({ where: { id } });

      if (!requestedPerson) {
        return res.status(404).send("Person not found.");
      }

      await database.Person.update(Person, {
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
      const requestedPerson = await database.Person.findOne({ where: { id } });

      if (!requestedPerson) {
        return res.status(404).send("Person not found.");
      }

      await database.Person.destroy({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PeopleController;
