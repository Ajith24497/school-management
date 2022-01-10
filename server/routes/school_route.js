const express = require("express");
const router = express.Router();
const validate = require("../validation/validate");
const validateSchool = require("../validation/validate_school");
const {
  getSchool,
  addSchool,
  updateSchool,
  deleteSchool,
  getAllSchool,
} = require("../controller/school_controller");

router
  .get("/:uuid", getSchool)
  .get("/", getAllSchool)
  .post("/", validateSchool(), validate, addSchool)
  .put("/", updateSchool)
  .delete("/", deleteSchool);

module.exports = router;
