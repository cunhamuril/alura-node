"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Classes",
      [
        {
          startDate: "2020-02-01",
          levelId: 1,
          teacherId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startDate: "2020-02-01",
          levelId: 2,
          teacherId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startDate: "2020-02-01",
          levelId: 3,
          teacherId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startDate: "2020-07-01",
          levelId: 3,
          teacherId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Classes", null, {});
  },
};
