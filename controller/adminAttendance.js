const adminAttendanceService = require("../service/adminAttendance");
const getEnable = async (_req, res, next) => {
  try {
    const attendance = await adminAttendanceService.getEnableService();
    res.status(201).json({ message: "success", attendance });
  } catch (e) {
    next(e);
  }
};
const getDisable = async (_req, res, next) => {
  try {
    const statusDisabled = await adminAttendanceService.getDisableService();
    res.status(200).json(statusDisabled);
  } catch (e) {
    next(e);
  }
};
const getStatus = async (_req, res, next) => {
  try {
    const currentStatus = await adminAttendanceService.getStatusService();
    res.status(200).json({ currentStatus });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getDisable,
  getEnable,
  getStatus,
};
