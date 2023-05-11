const express = require("express");
const User = require("../model/userSchema");
const user_service = require("../service/userService");

const app = express();
app.use(express.json());

const createUser = async function (req, res) {
  try {
    const { username, email, password, role } = req.body;
    let user = new User({ username, email, password, role });
    let id = await user_service.createNewUser(user);
    res.status(201).send({ message: "successfully created a new User", id });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { createUser };
