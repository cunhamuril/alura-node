"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("People", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("People", "deletedAt");
  },
};
