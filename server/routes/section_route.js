const express = require("express");
const router = express.Router();
const validate = require("../validation/validate");
const validateSection = require("../validation/validate_section");
const {
  getSection,
  getAllSection,
  addSection,
  updateSection,
  deleteSection,
} = require("../controller/section_controller");

router
  .get("/", getAllSection)
  .get("/:uuid", getSection)
  .post("/", validateSection(), validate, addSection)
  .put("/", updateSection)
  .delete("/", deleteSection);

module.exports = router;
