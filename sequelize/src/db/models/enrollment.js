"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Enrollment.belongsTo(models.Person, {
        foreignKey: "studentId",
      });
      Enrollment.belongsTo(models.Class);
    }
  }
  Enrollment.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Enrollment",
    }
  );
  return Enrollment;
};
