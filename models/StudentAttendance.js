const {model, Schema} = require('mongoose');


const studentAttendanceSehama = new Sehema({
      createdAt: Date,
      user:{
            type: Schema.Types.ObjectId,
            ref: "User"
      },
      adminAttendance:{
            type: Schema.Types.ObjectId,
            ref: "AdminAttendance"
      }
})


const studentAttendance = model("StudentAttendance", studentAttendanceSehama)

module.exports = studentAttendance