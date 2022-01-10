const express = require("express");
const router = express.Router();
const validate = require("../validation/validate");
const validateExam = require("../validation/validate_exam");
const {
  getExam,
  getAllExams,
  addExam,
  updateExam,
  deleteExam,
} = require("../controller/exam_controller");

router
  .get("/", getAllExams)
  .get("/:uuid", getExam)
  .post("/", validateExam(), validate, addExam)
  .put("/", updateExam)
  .delete("/", deleteExam);

module.exports = router;
