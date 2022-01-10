const { check } = require("express-validator");

const validateSubject = () => {
  return [
    check("school_id").notEmpty().withMessage("School Id is must"),
    check("staff_id").notEmpty().withMessage("Staff Id is must"),
    check("class_sec_id").notEmpty().withMessage("Class Section Id is must"),
    check("name").notEmpty().withMessage("Subject name is must"),
  ];
};

module.exports = validateSubject;
