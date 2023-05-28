const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registerService,
  loginService,
  resetPasswordService,
} = require("../service/auth");

const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerService({ name, email, password });
    console.log(user);

    res.status(201).json({ message: "User Create Successfully", user });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const token = await loginService({ email, password });
    console.log(token);
    res.status(200).json({ message: "login success", token });
  } catch (e) {
    next(e);
  }
};

const resetPasswordController = async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const updatePassword = await resetPasswordService({
      email,
      oldPassword,
      newPassword,
    });
    res
      .status(200)
      .json({ message: "Password reset successfully", user: updatePassword });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerController,
  loginController,
  resetPasswordController,
};
