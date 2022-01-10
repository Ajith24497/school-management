"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate({ User, School, ClassSection, MarkDetails }) {
      this.hasMany(MarkDetails, { foreignKey: "student_id" });
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
      this.belongsTo(School, { foreignKey: "school_id", as: "school" });
      this.belongsTo(ClassSection, {
        foreignKey: "class_sec_id",
        as: "class",
      });
    }
  }
  Student.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      roll_no: {
        type: DataTypes.INTEGER,
      },
      reg_no: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      school_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      class_sec_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      phone_no: {
        type: DataTypes.STRING(15),
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
      parent_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      parent_mobile_no: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female", "transgender"],
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      blood_group: {
        type: DataTypes.ENUM,
        values: ["B+ve", "A+ve", "B-ve"],
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "students",
      modelName: "Student",
    }
  );
  return Student;
};
