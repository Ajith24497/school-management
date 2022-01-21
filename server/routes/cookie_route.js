const express = require("express");
const router = express.Router();
const {
  createCookie,
  deleteCookie,
  getCookies,
} = require("../controller/cookie_controller");

router
  .post("/create", createCookie)
  .post("/delete", deleteCookie)
  .post("/get", getCookies);

module.exports = router;
