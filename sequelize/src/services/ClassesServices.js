const Sequelize = require("sequelize");

const database = require("../db/models");
const Services = require(".");

const Op = Sequelize.Op;

class ClassesServices extends Services {
  constructor() {
    super("Class");
  }

  async getOneRecord(id) {
    return super.getOneRecord(id, {
      include: [
        { model: database.Person, as: "teacher" },
        { model: database.Level, as: "level" },
      ],
    });
  }

  async getAllRecords(config = {}) {
    const where = {};

    if (config?.initialDate || config?.finalDate) {
      where.startDate = {};

      if (config?.initialDate) where.startDate[Op.gte] = config?.initialDate; // gte => greater then or equal
      if (config?.finalDate) where.startDate[Op.lte] = config?.finalDate; // lte => less then or equal
    }

    return super.getAllRecords(where, {
      include: [
        { model: database.Person, as: "teacher" },
        { model: database.Level, as: "level" },
      ],
    });
  }

  async getClassEnrollments(classId) {
    const classData = await super.getOneRecord(classId);

    return classData.getEnrollments({
      include: [{ model: database.Person, as: "student" }],
      where: { status: "confirmed" },
    });
  }
}

module.exports = ClassesServices;
