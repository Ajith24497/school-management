const express = require("express");
const router = express.Router();
const {
  checkToken,
  getUserFromToken,
} = require("../controller/check_token_controller");

router.get("/", checkToken).post("/", getUserFromToken);

module.exports = router;
