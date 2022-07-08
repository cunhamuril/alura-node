const database = require("../db/models");

const Services = require(".");

class PeopleServices extends Services {
  constructor() {
    super("Person");

    this.enrollments = new Services("Enrollments");
  }

  async getAllRecordsIncludeInactive(where = {}) {
    return database[this.modelName]
      .scope("all")
      .findAll({ where: { ...where } });
  }

  async cancelStudentAndEnrollment(studentId = 0) {
    return database.sequelize.transaction(async (transaction) => {
      await super.updateRecord(studentId, { active: false }, { transaction });

      await this.enrollments.updateRecords(
        { studentId },
        { status: "canceled" },
        { transaction }
      );
    });
  }

  async getAllEnrollmentsByStudent(studentId) {
    const student = await super.getOneRecord(studentId);

    return student.getEnrollments();
  }

  async getOneEnrollmentByStudent(studentId, enrollmentId) {
    return database.Enrollment.findOne({
      where: { id: enrollmentId, studentId },
    });
  }
}

module.exports = PeopleServices;
