const { check } = require("express-validator");

const validateMarkDetails = () => {
  return [
    check("exam_id").notEmpty().withMessage("Exam Id is must"),
    check("student_id").notEmpty().withMessage("Student Id is required"),
    check("mark")
      .notEmpty()
      .withMessage("Mark is required")
      .bail()
      .isInt({ min: 0, max: 100 })
      .withMessage("Mark should Between 0-100"),
  ];
};

module.exports = validateMarkDetails;
