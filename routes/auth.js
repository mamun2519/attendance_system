const {
  registerController,
  loginController,
  resetPasswordController,
} = require("../controller/auth");

const router = require("express").Router();

// Route
router.post("/register", registerController);
router.post("/login", loginController);
router.put("/resetPassword", resetPasswordController);

module.exports = router;
