const { check } = require("express-validator");
const { User } = require("../models");

const validateAdmin = () => {
  return [
    check("user_name")
      .notEmpty()
      .withMessage("User Name is must")
      .bail()
      .isLength({ min: 3 })
      .withMessage("User Name should have atleast 3 characters"),
    check("user_type").notEmpty().withMessage("User Type is required"),
    check("login_name")
      .notEmpty()
      .withMessage("Login Name is must")
      .bail()
      .custom(async (value) => {
        const user = await User.findOne({ where: { login_name: value } });
        if (user) {
          throw new Error("User Name Already Exists");
        }
      }),
    check("login_pass").notEmpty().withMessage("Password is must"),
  ];
};

module.exports = validateAdmin;
