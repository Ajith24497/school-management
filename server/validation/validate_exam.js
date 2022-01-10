const { check } = require("express-validator");

const validateExam = () => {
  return [
    check("exam_category").notEmpty().withMessage("Exam Category Id is must"),
    check("subject_id").notEmpty().withMessage("Subject Id is required"),
  ];
};

module.exports = validateExam;
