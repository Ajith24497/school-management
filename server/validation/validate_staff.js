const { check } = require("express-validator");
const { User } = require("../models");

const validateStaff = () => {
  return [
    check("user_type").notEmpty().withMessage("user type id is must"),
    check("user_name")
      .notEmpty()
      .withMessage("Staff Name is must")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Name should alteast 3 characters"),
    check("school_id").notEmpty().withMessage("School Id is must"),
    check("class_section").notEmpty().withMessage("Class Section Id is must"),
    check("designation_id").notEmpty().withMessage("Designation Id is must"),
    check("management_staff")
      .isBoolean()
      .withMessage("Management Staff flied requires boolean"),
    check("phone_no")
      .notEmpty()
      .withMessage("Phone No is must")
      .bail()
      .trim()
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone should be 10 characters"),
    check("gender").notEmpty().withMessage("Gender is must"),
    check("age")
      .notEmpty()
      .withMessage("Age is must")
      .bail()
      .isInt({ min: 1, max: 150 })
      .withMessage("Age should between 1-150"),
    check("date_of_birth")
      .notEmpty()
      .withMessage("Date of Birth is must")
      .bail()
      .isDate()
      .withMessage("Wrong Date Format"),
    check("login_name")
      .notEmpty()
      .withMessage("Login Name is must")
      .bail()
      .custom(async (value) => {
        const user = await User.findOne({ where: { login_name: value } });
        if (user) {
          throw new Error("User Name Already Exists");
        }
      }),
    check("login_pass").notEmpty().withMessage("Password is must"),
  ];
};

module.exports = validateStaff;
