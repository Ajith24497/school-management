const express = require("express");
const router = express.Router();
const validate = require("../validation/validate");
const validateSubject = require("../validation/validate_subject");
const {
  getSubject,
  getAllSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} = require("../controller/subject_controller");

router
  .get("/", getAllSubjects)
  .get("/:uuid", getSubject)
  .post("/", validateSubject(), validate, addSubject)
  .put("/", updateSubject)
  .delete("/", deleteSubject);

module.exports = router;
