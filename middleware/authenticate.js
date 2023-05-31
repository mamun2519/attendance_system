const User = require("../models/user");
const jwt = require("jsonwebtoken");
async function authorization(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "unauthorized Access" });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findById(decoded._id);
    if (!user) {
      res.status(401).json({ message: "unauthorized Access" });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = authorization;
