const express = require("express");
const router = express.Router();
const {
  userLogin,
  createUser,
  forgotPassword,
  updatePassword,
} = require("../controller/userController");

router.route("/login").post(userLogin);
router.route("/signup").post(createUser);
router.route("/forgotPassword").post(forgotPassword);
router.route("/forgotPassword/otp").post(updatePassword);

module.exports = router;
