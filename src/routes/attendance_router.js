const express = require("express");
const router = express.Router();
const attendanceController = require("../controller/attendance_controller");
const upload = require('../lib/upload');

router.post("/gps-attendance", upload.single('photo'), attendanceController.postGpsAttendance);

module.exports = router;