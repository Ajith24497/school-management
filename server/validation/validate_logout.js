const { check } = require("express-validator");

const validateLogout = () => {
  return [check("token").notEmpty().withMessage("Token is must")];
};

module.exports = validateLogout;
