const express = require("express");
const router = express.Router();
const logout = require("../controller/logout_controller");
const validate = require("../validation/validate");
const validateLogout = require("../validation/validate_logout");

router.get("/", logout);

module.exports = router;
