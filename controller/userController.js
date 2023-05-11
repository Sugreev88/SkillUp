const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const user_service = require("../service/userService");
const client = require("twilio")(
  process.env.ACCOUNT_SSID,
  process.env.AUTH_KEY
);
const app = express();
app.use(express.json());

const updatePassword = async function (req, res) {
  try {
    const { password, email, otp } = req.body;

    await user_service.updatePasswordToDb(email, password, otp);
    res.status(200).send({ msg: "succesfully updated the password" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const forgotPassword = async function (req, res) {
  try {
    const { phone, email } = req.body;
    console.log(phone, email);
    await user_service.generateOtp(phone, email);
    // await user_service.getUserByEmail({ email: email });
    res.status(200).send({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const createUser = async function (req, res) {
  try {
    const { username, email, password, role } = req.body;
    let user = new User({ username, email, password, role });
    let result = await user_service.createNewUser(user);
    res
      .status(201)
      .send({ message: "successfully created a new User", result });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const userLogin = async function (req, res) {
  try {
    const { email, password } = req.body;
    console.log(email);
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const result = await jwt.verify(token, process.env.SECRETKEY);
      if (result !== email) throw new Error("Invalid Email!!!");
      return res.status(200).send({ message: "User Logged in Successfully" });
    }

    const user = await user_service.getUserByEmail(email);
    // console.log(user);
    if (!user) throw new Error("User does not exist");
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new Error("Invalid credentials");
    // console.log(user._id, email);

    const Token = await user_service.generateToken(email);
    console.log(Token);
    await user_service.updateToken(user._id, Token);

    return res
      .status(200)
      .send({ message: "User logged in successfully", Token });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { userLogin, createUser, forgotPassword, updatePassword };
