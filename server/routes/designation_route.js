const express = require("express");
const router = express.Router();
const validate = require("../validation/validate");
const validateDesignation = require("../validation/validate_designation");
const {
  getDesignation,
  getAllDesignations,
  addDesignation,
  updateDesignation,
  deleteDesignation,
} = require("../controller/designation_controller");

router
  .get("/", getAllDesignations)
  .get("/:uuid", getDesignation)
  .post("/", validateDesignation(), validate, addDesignation)
  .put("/", updateDesignation)
  .delete("/", deleteDesignation);

module.exports = router;
