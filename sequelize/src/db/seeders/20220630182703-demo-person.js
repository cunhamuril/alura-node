"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "people",
      [
        {
          name: "John Doe",
          active: true,
          email: "john@john.com",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Doe",
          active: true,
          email: "jane@jane.com",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Murilo Cunha",
          active: true,
          email: "murilo@murilo.com",
          role: "teacher",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("people", null, {});
  },
};
