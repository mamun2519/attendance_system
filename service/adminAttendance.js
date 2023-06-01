const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");
const getEnableService = async () => {
  const running = await AdminAttendance.findOne({ status: "RUNNING" });
  if (running) {
    throw error("All ready running", 400);
  }
  const attendance = new AdminAttendance();
  return attendance.save();
};
const getStatusService = async () => {
  const running = await AdminAttendance.findOne({ status: "RUNNING" });
  if (!running) {
    throw error("Not Running", 400);
  }
  const started = addMinutes(new Date(running.createdAt), running.timeLimit);
  if (isAfter(new Date(), started)) {
    running.status = "COMPLETED";
    return running.save();
  } else {
    return running;
  }
};
const getDisableService = async () => {
  const running = await AdminAttendance.findOne({ status: "RUNNING" });
  if (!running) {
    throw error("Not Running", 400);
  }
  running.status = "COMPLETED";
  return running.save();
};

module.exports = {
  getEnableService,
  getDisableService,
  getStatusService,
};
