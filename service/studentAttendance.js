const AdminAttendance = require("../models/AdminAttendance");
const StudentAttendance = require("../models/StudentAttendance");
const adminAttendanceService = require("./adminAttendance");
const error = require("../utils/error");
const getStudentAttendanceService = async (id, req) => {
  const adminAttendance = await AdminAttendance.findById(id);
  if (!adminAttendance) {
    throw error("Invalid Attendance ID", 400);
  }
  // CHECK STATUS
  if (adminAttendance.status == "COMPLETED") {
    throw error("Attendance already completed");
  }

  let attendance = await StudentAttendance.findOne({
    adminAttendance: id,
    user: req.user._id,
  });
  // CHECK ALL READY SUBMIT ATTENDANCE
  if (attendance) {
    throw error("Already registered", 400);
  }

  attendance = new StudentAttendance({
    user: req.user._id,
    adminAttendance: id,
  });

  return attendance.save();
};

const getStudentsAttendanceStatus = async () => {
  const status = await adminAttendanceService.getStatusService();
  return status;
};

module.exports = { getStudentAttendanceService, getStudentsAttendanceStatus };
