const {model , Schema} = require('mongoose');


const profileSchema = new Schema({
      firstName: String,
      lastName: String,
      phone: Number,
      avater: String,
      user:{
            type: Schema.Types.ObjectId,
            ref: "User"
      }
})


const profile = model("Profile", profileSchema)

module.exports = profile