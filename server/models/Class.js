"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate({ School, ClassSection }) {
      this.belongsTo(School, { foreignKey: "school_id", as: "school" });
      this.hasMany(ClassSection, { foreignKey: "class_id" });
    }
  }
  Class.init(
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
      tableName: "classes",
      modelName: "Class",
    }
  );
  return Class;
};
