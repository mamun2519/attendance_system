const { is } = require("date-fns/locale");
const profileService = require("../service/userProfile");
const error = require("../utils/error");
const getUsersProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfiles();
    res.status(200).json(profile);
  } catch (e) {
    next(e);
  }
};
const getUserProfileByID = async (req, res, next) => {
  try {
    const profile = await profileService.getProfileById(req.user._id);
    res.status(200).json(profile);
  } catch (e) {
    next(e);
  }
};
const postUserProfile = async (req, res, next) => {
  const { name, phone, avatar } = req.body;
  try {
    const profile = await profileService.createProfile({
      name,
      phone,
      avatar,
      user: req.user._id,
    });
    res.status(200).json({ message: "success", profile });
  } catch (e) {
    next(e);
  }
};
const patchUserProfileByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, avatar } = req.body;
    const profile = await profileService.patchUserProfile(id, {
      name,
      phone,
      avatar,
    });
    res.status(201).json(profile);
  } catch (e) {
    next(e);
  }
};
const deleteUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDeleteProfile = await profileService.deleteProfile(id);
    if (!isDeleteProfile) {
      throw error("Profile Not found", 404);
    }
    res.status(203).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  deleteUserProfile,
  getUserProfileByID,
  getUsersProfile,
  postUserProfile,
  patchUserProfileByID,
};
