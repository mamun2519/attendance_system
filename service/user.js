const User = require("../models/user");
const error = require("../utils/error");

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : "STUDENT",
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

const findUsers = () => {
  return User.find();
};

const deleteUser = (id) => {
  const isDeleted = User.findByIdAndDelete(id);
  return isDeleted;
};

const updateUser = async (id, data) => {
  const user = await findUserByProperty("email", data.email);
  if (user) {
    throw error("Email already in use", 400);
  }
  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};
module.exports = {
  findUserByProperty,
  createUser,
  findUsers,
  deleteUser,
  updateUser,
};
