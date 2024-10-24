const express = require("express");
const { regis, login } = require("../controllers/auth-controllers");

const router = express.Router();

router.post("/regis", regis);
router.post("/login", login);

module.exports = router;