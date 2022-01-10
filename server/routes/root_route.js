const express = require("express");
const router = express.Router();
const { getRoot } = require("../controller/root_controller");

router.get("/", getRoot);

module.exports = router;
