const express = require("express");
const router = express.Router();
const validateAdmin = require("../validation/validate_admin");
const validate = require("../validation/validate");
const {
  getAdmin,
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controller/admin_controller");

router
  .get("/:uuid", getAdmin)
  .get("/", getAllAdmins)
  .post("/", validateAdmin(), validate, addAdmin)
  .put("/", updateAdmin)
  .delete("/", deleteAdmin);

module.exports = router;
