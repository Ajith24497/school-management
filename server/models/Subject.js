"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate({ School, Staff, ClassSection }) {
      this.belongsTo(School, { foreignKey: "school_id", as: "school" });
      this.belongsTo(Staff, { foreignKey: "staff_id", as: "staff" });
      this.belongsTo(ClassSection, {
        foreignKey: "class_sec_id",
        as: "class_section",
      });
    }
  }
  Subject.init(
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      school_id: { type: DataTypes.BIGINT, allowNull: false },
      staff_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      class_sec_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "subjects",
      modelName: "Subject",
    }
  );
  return Subject;
};
