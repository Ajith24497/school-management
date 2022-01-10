const { check } = require("express-validator");

const validateDesignation = () => {
  return [
    check("name")
      .notEmpty()
      .withMessage("Designation Name is must")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Designation should have atleast 3 characters"),
    check("school_id").notEmpty().withMessage("School Id is required"),
  ];
};

module.exports = validateDesignation;
