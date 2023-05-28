const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerService = async ({ name, email, password }) => {
  try {
    let user = await User.findOne({ email });
    console.log(user);
    if (user) {
      res.status(400).json({ message: "User already exists" });
    }
    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    return user.save();
  } catch (e) {}
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "invalid Credential" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "invalid Credential" });
  }

  delete user._doc.password;
  const token = jwt.sign(user._doc, "secret-key", { expiresIn: "2h" });
  return token;
};

const resetPasswordService = async ({ email, oldPassword, newPassword }) => {
  let user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "invalid Credential" });
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "invalid Credential" });
  }

  // SET NEW PASSWORD
  const salt = await bcrypt.genSalt(8);
  const hashPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashPassword;
  return user.save();
};
module.exports = {
  registerService,
  loginService,
  resetPasswordService,
};
