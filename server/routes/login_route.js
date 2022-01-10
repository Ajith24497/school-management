const express = require("express");
const router = express.Router();
const login = require("../controller/login_controller");
const validate = require("../validation/validate");
const validateLogin = require("../validation/validate_login");

router.post("/", validateLogin(), validate, login);

module.exports = router;
