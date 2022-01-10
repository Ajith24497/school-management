const express = require("express");
const router = express.Router();
const validate = require("../validation/validate");
const validateUserType = require("../validation/validate_user_type");
const {
  getUserType,
  getAllUserTypes,
  addUserType,
  updateUserType,
  deleteUserType,
} = require("../controller/user_type_controller");

router
  .get("/:uuid", getUserType)
  .get("/", getAllUserTypes)
  .post("/", validateUserType(), validate, addUserType)
  .put("/", updateUserType)
  .delete("/", deleteUserType);

module.exports = router;
