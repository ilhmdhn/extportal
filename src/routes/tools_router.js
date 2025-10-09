const express = require("express");
const router = express.Router();
const tool_controller = require("../controller/tools_controller");

router.get("/version/:type", tool_controller.getVersion);

module.exports = router;