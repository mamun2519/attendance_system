const router = require("express").Router();
const studentAttendanceController = require("../controller/studentAttendance");

router.get("/status", studentAttendanceController.getAttendanceStatus);
router.get("/:id", studentAttendanceController.getAttendance);

module.exports = router;
