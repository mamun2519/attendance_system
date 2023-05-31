const express = require("express");
const connectDB = require("./db");
const app = express();
const routes = require("./routes/main");

app.use([express.json(), routes]);
app.get("/", (req, res) => {
  res.send("hello world");
});

// GLOBAL ERROR HANDEL
app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.status ? err.status : 500;

  res.status(status).json({
    message,
  });
});

// DATABASE CONFIG
connectDB("mongodb+srv://mamun:Kfp5dLL8dZEmaPmB@database.jzvvyeg.mongodb.net/")
  .then(() => {
    console.log("Database Connected");
    app.listen(5000, () => {
      console.log("server listen port 5000");
    });
  })
  .catch((e) => console.log(e));
