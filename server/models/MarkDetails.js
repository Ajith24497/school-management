"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MarkDetails extends Model {
    static associate({ Exam, Student }) {
      this.belongsTo(Exam, { foreignKey: "exam_id", as: "exam" });
      this.belongsTo(Student, { foreignKey: "student_id", as: "student" });
    }
  }
  MarkDetails.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      exam_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      student_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      mark: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "mark_details",
      modelName: "MarkDetails",
    }
  );
  return MarkDetails;
};
