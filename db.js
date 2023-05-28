const mongoose = require('mongoose');

function connectDB(connectUrl){
      return mongoose.connect(connectUrl, {  useNewUrlParser: true,
            useUnifiedTopology: true})

}

module.exports = connectDB

// TODO Db PASS Kfp5dLL8dZEmaPmB