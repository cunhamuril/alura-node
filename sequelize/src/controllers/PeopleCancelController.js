const database = require("../db/models");

class PeopleCancelController {
  static async store(req, res) {
    const { id } = req.params;

    try {
      await database.sequelize.transaction(async (transaction) => {
        await database.Person.update(
          { active: false },
          { where: { id } },
          { transaction }
        );
        await database.Enrollment.update(
          { status: "canceled" },
          { where: { studentId: id } },
          { transaction }
        );

        return res
          .status(200)
          .json({ message: `Enrollments ref student ${id} canceled.` });
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PeopleCancelController;
