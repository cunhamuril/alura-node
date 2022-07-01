"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Enrollments",
      [
        {
          status: "confirmed",
          studentId: 1,
          classId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "confirmed",
          studentId: 2,
          classId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "confirmed",
          studentId: 3,
          classId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "confirmed",
          studentId: 4,
          classId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "canceled",
          studentId: 1,
          classId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "canceled",
          studentId: 2,
          classId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Enrollments", null, {});
  },
};
