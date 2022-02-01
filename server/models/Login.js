"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "user_id", as: "user" });
    }
  }
  Login.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      expire_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "login_details",
      modelName: "Login",
    }
  );
  return Login;
};
