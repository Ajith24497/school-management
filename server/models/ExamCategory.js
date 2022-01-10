"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExamCategory extends Model {
    static associate({ School, Exam }) {
      this.belongsTo(School, { foreignKey: "school_id", as: "school" });
      this.hasMany(Exam, { foreignKey: "exam_category_id" });
    }
  }
  ExamCategory.init(
    {
      name: {
        type: DataTypes.STRING,
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
      tableName: "exam_categories",
      modelName: "ExamCategory",
    }
  );
  return ExamCategory;
};
