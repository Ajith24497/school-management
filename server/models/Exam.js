"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    static associate({ ExamCategory, MarkDetails }) {
      this.belongsTo(ExamCategory, {
        foreignKey: "exam_category_id",
        as: "exam_category",
      });
      this.hasMany(MarkDetails, { foreignKey: "exam_id" });
    }
  }
  Exam.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      exam_category_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      subject_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "exam",
      modelName: "Exam",
    }
  );
  return Exam;
};
