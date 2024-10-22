const express = require("express");
const { regis, login } = require("../controllers/auth-controller");

const router = express.Router();

router.post("/regis", regis);
router.post("/login", login);

module.exports = router;