const express = require("express");
const router = express.Router();
const validate = require("../validation/validate");
const validateStaff = require("../validation/validate_staff");
const {
  getAllStaffs,
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
} = require("../controller/staff_controller");

router
  .get("/", getAllStaffs)
  .get("/:uuid", getStaff)
  .post("/", validateStaff(), validate, addStaff)
  .put("/", updateStaff)
  .delete("/", deleteStaff);

module.exports = router;
