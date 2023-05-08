const express = require("express");
const router = express.Router();
const { userLogin } = require("../controller/user_controller");

router.route("/user/login/").post(userLogin);
// router.route("/user/login/token").post(loginUser);

module.exports = router;
