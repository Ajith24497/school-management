"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SuperAdmin extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
    }
  }
  SuperAdmin.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      tableName: "super_admin",
      modelName: "SuperAdmin",
    }
  );
  return SuperAdmin;
};
