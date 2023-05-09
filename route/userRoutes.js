const express = require("express");
const router = express.Router();
const { userLogin, createUser } = require("../controller/userController");

router.route("/login").post(userLogin);
router.route("/signup").post(createUser);

module.exports = router;
