const { check } = require("express-validator");

const validateSchool = () => {
  return [
    check("name")
      .notEmpty()
      .withMessage("School Name is Must")
      .bail()
      .isLength({ min: 3 })
      .withMessage("School Name should be min 3 characters"),
    check("syllabus")
      .notEmpty()
      .withMessage("Syllabus is must")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Syllabus should be min 3 characters"),
    check("address")
      .notEmpty()
      .withMessage("Address is must")
      .bail()
      .isLength({ min: 10 })
      .withMessage("Address should be min 10 characters"),
    check("email")
      .notEmpty()
      .withMessage("Email is must")
      .bail()
      .isEmail()
      .withMessage("Email id is not valid"),
    check("tel_no")
      .notEmpty()
      .withMessage("Tel No is must")
      .bail()
      .isLength({ min: 5, max: 15 })
      .withMessage("Tel No should between 5-15 characters"),
  ];
};

module.exports = validateSchool;
