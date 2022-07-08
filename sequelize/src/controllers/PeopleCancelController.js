const PeopleServices = require("../services/PeopleServices");

const peopleServices = new PeopleServices();

class PeopleCancelController {
  static async store(req, res) {
    const { id } = req.params;

    try {
      await peopleServices.cancelStudentAndEnrollment(id);

      return res
        .status(200)
        .json({ message: `Enrollments ref student ${id} canceled.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PeopleCancelController;
