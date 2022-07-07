"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.hasMany(models.Enrollment, {
        as: "enrollments",
      });
      Class.belongsTo(models.Person, {
        foreignKey: "teacherId",
        as: "teacher",
      });
      Class.belongsTo(models.Level, {
        as: "level",
      });
    }
  }
  Class.init(
    {
      startDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Class",
      paranoid: true, // Soft delete => os registros da tabela não vão ser verdadeiramente apagados
    }
  );
  return Class;
};
