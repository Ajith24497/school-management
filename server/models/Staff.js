"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate({ School, ClassSection, Designation, User, Subject }) {
      this.belongsTo(ClassSection, {
        foreignKey: "class_sec_id",
        as: "class_section",
      });
      this.belongsTo(School, { foreignKey: "school_id", as: "school" });
      this.belongsTo(Designation, {
        foreignKey: "designation_id",
        as: "designation",
      });
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
      this.hasMany(Subject, { foreignKey: "staff_id" });
    }
  }
  Staff.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      school_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      class_sec_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      designation_id: {
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
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      management_staff: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      tableName: "staff",
      modelName: "Staff",
    }
  );
  return Staff;
};
