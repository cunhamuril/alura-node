"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Levels",
      [
        {
          description: "basic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "intermediary",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: "advanced",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Levels", null, {});
  },
};
