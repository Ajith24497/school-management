"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    static associate({
      Student,
      Class,
      Section,
      ClassSection,
      Designation,
      Staff,
      Subject,
    }) {
      this.hasMany(Student, { foreignKey: "school_id" });
      this.hasMany(Class, { foreignKey: "school_id" });
      this.hasMany(Section, { foreignKey: "school_id" });
      this.hasMany(ClassSection, { foreignKey: "school_id" });
      this.hasMany(Designation, { foreignKey: "school_id" });
      this.hasMany(Staff, { foreignKey: "school_id" });
      this.hasMany(Subject, { foreignKey: "school_id" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  School.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      branch: {
        type: DataTypes.STRING(20),
      },
      syllabus: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          isEmail: true,
        },
      },
      tel_no: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      tableName: "schools",
      modelName: "School",
    }
  );
  return School;
};
