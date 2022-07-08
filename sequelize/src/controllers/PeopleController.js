const PeopleServices = require("../services/PeopleServices");

const peopleServices = new PeopleServices();

class PeopleController {
  static async index(req, res) {
    const { includeInactive } = req.query;

    try {
      const people = includeInactive
        ? await peopleServices.getAllRecordsIncludeInactive()
        : await peopleServices.getAllRecords();

      return res.status(200).json(people);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    try {
      const Person = await peopleServices.getOneRecord(id);

      if (!Person) {
        return res.status(404).send("Person not found.");
      }

      return res.status(200).json(Person);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async store(req, res) {
    const person = req.body;

    try {
      const createdPerson = await peopleServices.createRecord(person);

      return res.status(201).json(createdPerson);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      await peopleServices.updateRecord(id, data);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;

    try {
      const requestedPerson = await peopleServices.deleteRecord(id);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PeopleController;
