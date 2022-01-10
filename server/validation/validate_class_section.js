const { check } = require("express-validator");

const validateClassSection = () => {
  return [
    check("classUUID").notEmpty().withMessage("Class Id is must"),
    check("sectionUUID").notEmpty().withMessage("Section Id is must"),
    check("schoolUUID").notEmpty().withMessage("School Id is must"),
  ];
};

module.exports = validateClassSection;
