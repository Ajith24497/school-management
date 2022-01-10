const express = require("express");
const router = express.Router();
const validateStudent = require("../validation/validate_student");
const validate = require("../validation/validate");
const staffAuth = require("../middleware/staff_auth");
const {
  getStudent,
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/student_controller");

router
  .get("/", staffAuth, getAllStudents)
  .get("/:uuid", getStudent)
  .post("/", validateStudent(), validate, addStudent)
  .put("/", updateStudent)
  .delete("/", deleteStudent);

module.exports = router;
