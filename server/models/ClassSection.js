"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClassSection extends Model {
    static associate({ Student, School, Class, Section, Staff, Subject }) {
      this.hasMany(Student, { foreignKey: "class_sec_id" });
      this.hasMany(Staff, { foreignKey: "class_sec_id" });
      this.hasMany(Subject, { foreignKey: "class_sec_id" });
      this.belongsTo(School, { foreignKey: "school_id", as: "school" });
      this.belongsTo(Class, { foreignKey: "class_id", as: "class" });
      this.belongsTo(Section, { foreignKey: "section_id", as: "section" });
    }
  }
  ClassSection.init(
    {
      name: {
        type: DataTypes.STRING(15),
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
      class_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      section_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      school_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "class_section",
      modelName: "ClassSection",
    }
  );
  return ClassSection;
};
