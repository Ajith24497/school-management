const express = require("express");
const router = express.Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controller/user_controller");

router
  .get("/:uuid", getUser)
  .get("/", getAllUsers)
  .put("/", updateUser)
  .delete("/", deleteUser);

module.exports = router;
