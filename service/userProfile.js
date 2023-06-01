const UserProfile = require("../models/profile");
const error = require("../utils/error");

const createProfile = (data) => {
  const profile = new UserProfile({ ...data });
  return profile.save();
};

const getProfileById = async (id) => {
  const profile = await UserProfile.findOne({ user: id }).populate("user");
  if (!profile) {
    throw error("Profile not found", 404);
  }
  return profile;
};

const patchUserProfile = async (id, data) => {
  const profile = await UserProfile.findById(id).populate("user");
  console.log(data);
  if (!profile) {
    throw error("Profile not found", 404);
  }
  profile.name.firstName = data.name?.firstName ?? profile.name.firstName;
  profile.name.lastName = data.name?.lastName ?? profile.name.lastName;
  profile.phone = data.phone ?? profile.phone;
  profile.avatar = data.avatar ?? profile.avatar;

  return profile.save();
};
const getProfiles = () => {
  return UserProfile.find({}).populate("user");
};

const deleteProfile = (id) => {
  const isDelete = UserProfile.findByIdAndDelete(id);
  return isDelete;
};
module.exports = {
  createProfile,
  getProfileById,
  patchUserProfile,
  getProfiles,
  deleteProfile,
};
