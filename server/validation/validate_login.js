const { User } = require("../models");
const { check } = require("express-validator");

const validateLogin = () => {
  return [
    check("login_name")
      .notEmpty()
      .withMessage("Login Name is must")
      .bail()
      .custom(async (value) => {
        const login = await User.findOne({ where: { login_name: value } });
        if (!login) {
          throw new Error("Login Name does'nt exists");
        }
      }),
    check("login_pass").notEmpty().withMessage("Password is must"),
  ];
};

module.exports = validateLogin;
