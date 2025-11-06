const express = require("express");
const router = express.Router();
const outletController = require("../controller/outlet_controller");

router.get("/list", outletController.outletList);

module.exports = router;