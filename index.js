const express = require("express");
const connectDB = require("./db");
const app = express();
const routes = require("./routes/main");
const authorization = require("./middleware/authenticate");

app.use([express.json(), routes]);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/private", authorization, async (req, res, next) => {
  try {
    res.status(200).json({ message: "This is private route", user: req.user });
  } catch (e) {
    return res.status(400).json({ message: "Invalid Token" });
  }
});
// global error handel
app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message ? err.message : 'Server Error Occurred';
  const status = err.status ? err.status : 500;

  res.status(status).json({
      message,
  });
});

// database config
connectDB("mongodb+srv://mamun:Kfp5dLL8dZEmaPmB@database.jzvvyeg.mongodb.net/")
  .then(() => {
    console.log("Database Connected");
    app.listen(5000, () => {
      console.log("server listen port 5000");
    });
  })
  .catch((e) => console.log(e));
