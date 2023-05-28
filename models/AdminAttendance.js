const {model, Schema}= require('mongoose');


const adminAttendanceSchema = new Schema({
      timeLimit: Number,
      status: String,
      date: Date
})



const adminAttendance = model("AdminAttendance", adminAttendanceSchema)


module.exports = adminAttendance