const express = require("express");
const router = express.Router();
const validate = require("../validation/validate");
const validateExamCategory = require("../validation/validate_exam_category");
const {
  getExamCategory,
  getAllExamCategory,
  addExamCategory,
  updateExamCategory,
  deleteExamCategory,
} = require("../controller/exam_category_controller");

router
  .get("/", getAllExamCategory)
  .get("/:uuid", getExamCategory)
  .post("/", validateExamCategory(), validate, addExamCategory)
  .put("/", updateExamCategory)
  .delete("/", deleteExamCategory);

module.exports = router;
