const router = require("express").Router();
const authRoutes = require("./auth");
const userRoute = require("./user");
const authenticate = require("../middleware/authenticate");
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", authenticate, userRoute);

module.exports = router;
