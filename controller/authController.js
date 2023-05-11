const express = require("express");
const user_service = require("../service/userService");
const authService = require("../service/authService");
const app = express();
app.use(express.json());

const updatePassword = async function (req, res) {
  try {
    const { password, email, otp } = req.body;
    await authService.updatePasswordToDb(email, password, otp);
    res.status(200).send({ msg: "succesfully updated the password" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const forgotPassword = async function (req, res) {
  try {
    const { phone, email } = req.body;
    await authService.generateOtp(phone, email);
    res.status(200).send({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const userLogin = async function (req, res) {
  try {
    const { email, password } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      await authService.verifyToken(token, email);
      return res.status(200).send({ message: "User Logged in Successfully" });
    }
    const user = await user_service.getUserByEmail(email);
    if (!user) throw new Error("User does not exist");
    await authService.verifyPassword(password, user.password);
    const Token = await authService.generateToken(email);
    await authService.updateToken(user._id, Token);
    return res
      .status(200)
      .send({ message: "User logged in successfully", Token });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { userLogin, forgotPassword, updatePassword };
