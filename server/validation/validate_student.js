const { check } = require("express-validator");
const { User, Student, School } = require("../models");

const validateStudent = () => {
  return [
    check("student_name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name should be 3 characters"),
    check("roll_no").isInt().withMessage("Roll No must be a number"),
    check("reg_no")
      .notEmpty()
      .withMessage("Reg No is must")
      .bail()
      .custom(async (value, { req }) => {
        const school_id = req.body.school_id;
        const student = await Student.findOne({
          where: { reg_no: value },
          include: {
            model: School,
            as: "school",
          },
        });
        if (student?.school.dataValues.uuid === school_id)
          throw new Error("Duplicate Reg No of same School");
      }),
    check("school_id").notEmpty().withMessage("School Id is must"),
    check("class_sec_id").notEmpty().withMessage("Class Section Id is must"),
    check("phone_no")
      .notEmpty()
      .withMessage("Phone No is must")
      .bail()
      .trim()
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone should be 10 characters"),
    check("address").notEmpty().withMessage("Address is must"),
    check("parent_name")
      .notEmpty()
      .withMessage("Parent Name is must")
      .bail()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name should be min 3 characters"),
    check("parent_mobile_no")
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
    check("blood_group").notEmpty().withMessage("Blood Group is must"),
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

module.exports = validateStudent;
