const express = require("express");
const router = express.Router();
const validateAdmin = require("../validation/validate_admin");
const validate = require("../validation/validate");
const superAdminAuth = require("../middleware/super_admin_auth");
const adminAuth = require("../middleware/admin_auth");
const {
  getAdmin,
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controller/admin_controller");

router
  .get("/:uuid", getAdmin)
  .get("/", superAdminAuth, getAllAdmins)
  .post("/", superAdminAuth, validateAdmin(), validate, addAdmin)
  .put("/", adminAuth, updateAdmin)
  .delete("/", superAdminAuth, deleteAdmin);

module.exports = router;
