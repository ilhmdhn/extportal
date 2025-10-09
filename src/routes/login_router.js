const express = require("express");
const router = express.Router();
const userRoute = require("../controller/login_controller");

router.post("/login", userRoute.login);

module.exports = router;
