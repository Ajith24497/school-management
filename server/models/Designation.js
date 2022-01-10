"use strict";
const { Model, BIGINT } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Designation extends Model {
    static associate({ School, Staff }) {
      this.hasMany(Staff, { foreignKey: "school_id" });
      this.belongsTo(School, { foreignKey: "school_id", as: "school" });
    }
  }
  Designation.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      grade: {
        type: DataTypes.STRING(5),
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
    },
    {
      sequelize,
      tableName: "designation",
      modelName: "Designation",
    }
  );
  return Designation;
};
