const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createUser } = require("./user");
const error = require("../utils/error");
const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserByProperty("email", email);
  if (user) {
    throw error("User already exists", 400);
  }
  const salt = await bcrypt.genSalt(8);
  const hashPassword = await bcrypt.hash(password, salt);

  return createUser({
    name,
    email,
    password: hashPassword,
    roles,
    accountStatus,
  });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) {
    throw error("invalid Credential", 400);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw error("invalid Credential", 400);
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  const token = jwt.sign(payload, "secret-key", { expiresIn: "2h" });
  return token;
};

const resetPasswordService = async ({ email, oldPassword, newPassword }) => {
  let user = await findUserByProperty("email", email);
  if (!user) {
    throw error("invalid Credential", 400);
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw error("invalid Credential", 400);
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
