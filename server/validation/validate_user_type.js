const { check } = require("express-validator");

const validateUserType = () => {
  return [check("type_name").notEmpty().withMessage("User Type name is must")];
};

module.exports = validateUserType;
