"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Person.hasMany(models.Class, {
        foreignKey: "teacherId",
      });
      Person.hasMany(models.Enrollment, {
        foreignKey: "studentId",
        // scope: { status: "confirmed" },
        as: "Enrollments",
      });
    }
  }
  Person.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          validateFunc: (value) => {
            if (value.length < 3) {
              throw new Error(
                "The name field should contain more than 3 characters."
              );
            }
          },
        },
      },
      active: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email type.",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: ["student", "teacher"],
            msg: "The role field should be 'student' or 'teacher'.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Person",
      paranoid: true,
      defaultScope: {
        where: { active: true },
      },
      scopes: {
        all: { where: {} },
        // etc: { constraint: value }
      },
    }
  );
  return Person;
};
