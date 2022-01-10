const { check } = require("express-validator");

const validateClass = () => {
  return [
    check("name").notEmpty().withMessage("User Name is must"),
    check("schoolId").notEmpty().withMessage("User Type is required"),
  ];
};

module.exports = validateClass;
