"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Classes", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Classes", "deletedAt");
  },
};
