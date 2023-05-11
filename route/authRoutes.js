const express = require("express");
const router = express.Router();
const {
  userLogin,
  forgotPassword,
  updatePassword,
} = require("../controller/authController");

router.route("/login").post(userLogin);
router.route("/forgotPassword").post(forgotPassword);
router.route("/updatePassword").post(updatePassword);

module.exports = router;
