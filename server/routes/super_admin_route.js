const express = require("express");
const router = express.Router();
const {
  getSuperAdmin,
  getAllSuperAdmins,
  updateSuperAdmin,
  addSuperAdmin,
  deleteSuperAdmin,
} = require("../controller/super_admin_controller");

router
  .get("/:uuid", getSuperAdmin)
  .get("/", getAllSuperAdmins)
  .post("/", addSuperAdmin)
  .put("/", updateSuperAdmin)
  .delete("/", deleteSuperAdmin);

module.exports = router;
