const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");

router.get("/access", userController.accessControl);

module.exports = router;