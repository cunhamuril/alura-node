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
}

module.exports = PeopleController;
