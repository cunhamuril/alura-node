const database = require("../db/models");
const Services = require(".");

class EnrollmentsServices extends Services {
  constructor() {
    super("Enrollment");
  }

  async getAllRecords() {
    return super.getAllRecords(
      {},
      {
        include: [
          { model: database.Class, as: "class" },
          { model: database.Person, as: "student" },
        ],
      }
    );
  }

  async getOneRecord(id) {
    return super.getOneRecord(id, {
      include: [
        { model: database.Class, as: "class" },
        { model: database.Person, as: "student" },
      ],
    });
  }
}

module.exports = EnrollmentsServices;
