"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ UserType, Student, Admin, Staff }) {
      this.belongsTo(UserType, { foreignKey: "user_type_id", as: "user_type" });
      this.hasOne(Student, { foreignKey: "user_id" });
      this.hasOne(Staff, { foreignKey: "user_id" });
      this.hasOne(Admin, { foreignKey: "user_id" });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        login_name: undefined,
        login_pass: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }

  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      login_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      login_pass: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
