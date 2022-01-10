const express = require("express");
const router = express.Router();
const validate = require("../validation/validate");
const validateClassSection = require("../validation/validate_class_section");
const {
  getClassSection,
  getAllClassSection,
  addClassSection,
  updateClassSection,
  deleteClassSection,
} = require("../controller/class_section_controller");

router
  .get("/", getAllClassSection)
  .get("/:uuid", getClassSection)
  .post("/", validateClassSection(), validate, addClassSection)
  .put("/", updateClassSection)
  .delete("/", deleteClassSection);

module.exports = router;
