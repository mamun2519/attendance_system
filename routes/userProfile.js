const router = require("express").Router();
const userProfileController = require("../controller/user-profile");
router.get("/id", userProfileController.getUserProfileByID);
router.patch("/:id", userProfileController.patchUserProfileByID);
router.delete("/:id", userProfileController.deleteUserProfile);
router.post("/", userProfileController.postUserProfile);
router.get("/", userProfileController.getUsersProfile);

module.exports = router;
