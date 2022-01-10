const express = require("express");
const router = express.Router();
const validate = require("../validation/validate");
const validateMarkDetails = require("../validation/validate_mark_details");
const {
  getMarkDetails,
  getAllMarkDetails,
  addMarkDetails,
  updateMarkDetails,
  deleteMarkDetails,
} = require("../controller/mark_details_controller");

router
  .get("/", getAllMarkDetails)
  .get("/:uuid", getMarkDetails)
  .post("/", validateMarkDetails(), validate, addMarkDetails)
  .put("/", updateMarkDetails)
  .delete("/", deleteMarkDetails);

module.exports = router;
