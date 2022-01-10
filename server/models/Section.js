"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    static associate({ School, ClassSection }) {
      this.belongsTo(School, { foreignKey: "school_id", as: "school" });
      this.hasMany(ClassSection, { foreignKey: "section_id" });
    }
  }
  Section.init(
    {
      name: {
        type: DataTypes.STRING(10),
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
      school_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "sections",
      modelName: "Section",
    }
  );
  return Section;
};
