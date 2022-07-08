const ClassesServices = require("../services/ClassesServices");

const classesServices = new ClassesServices();

class ClassesRestoreController {
  static async store(req, res) {
    const { id } = req.params;

    try {
      await classesServices.restoreRecord(id);

      return res.status(200).json({ message: `id ${id} restored` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ClassesRestoreController;
