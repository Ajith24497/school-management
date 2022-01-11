const express = require("express");
const router = express.Router();
const validate = require("../validation/validate");
const validateClass = require("../validation/validate_class");
const managementStaffAuth = require("../middleware/management_staff_auth");
const {
  getClass,
  getAllClass,
  addClass,
  updateClass,
  deleteClass,
} = require("../controller/class_controller");

router
  .get("/", managementStaffAuth, getAllClass)
  .get("/:uuid", getClass)
  .post("/", validateClass(), validate, addClass)
  .put("/", updateClass)
  .delete("/", deleteClass);

module.exports = router;
