const PeopleServices = require("../services/PeopleServices");

const peopleServices = new PeopleServices();

class PeopleRestoreController {
  static async store(req, res) {
    const { id } = req.params;

    try {
      await peopleServices.restoreRecord(id);

      return res.status(200).json({ message: `id ${id} restored` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PeopleRestoreController;
