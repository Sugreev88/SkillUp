const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const user_service = require("../service/userService");
const app = express();
app.use(express.json());

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
    const token = req.headers.authorization.split(" ")[0];
    if (token) {
      const result = await jwt.verify(token, process.env.SECRETKEY);
      if (result !== email) throw new Error("Invalid Email!!!");
      return res.status(200).send({ message: "User Logged in Successfully" });
    }

    const user = await user_service.getUserByEmail(email);
    if (!user) throw new Error("User does not exist");
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new Error("Invalid credentials");

    const Token = await user_service.generateToken(email);
    await user_service.updateToken(user._id, Token);

    return res
      .status(200)
      .send({ message: "User logged in successfully", Token });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { userLogin, createUser };
