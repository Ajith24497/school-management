const { check } = require("express-validator");

const validateSection = () => {
  return [
    check("name").notEmpty().withMessage("User Name is must"),
    check("schoolId").notEmpty().withMessage("User Type is required"),
  ];
};

module.exports = validateSection;
