const studentAttendanceService = require("../service/studentAttendance");
const getAttendance = async (req, res, next) => {
  const { id } = req.params;
  try {
    const attendance =
      await studentAttendanceService.getStudentAttendanceService(id, req);
    res.status(200).json(attendance);
  } catch (e) {
    next(e);
  }
};
const getAttendanceStatus = async (_req, res, next) => {
  try {
    const status = await studentAttendanceService.getStudentsAttendanceStatus();
    return res.status(201).json(status);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAttendance,
  getAttendanceStatus,
};
