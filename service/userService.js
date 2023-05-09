const mongoose = require("mongoose");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const getUserByEmail = async function (email) {
  try {
    const emailid = email;
    let result = await User.findOne({ email: emailid });
    return result;
  } catch (err) {
    throw err;
  }
};

const createNewUser = async function (user) {
  try {
    let result = await user.save();
    return result;
  } catch (err) {
    throw err;
  }
};

const updateToken = async function (id, Token) {
  console.log(id);
  let result = await User.findOneAndUpdate({ _id: id }, { token: Token });
  return result;
};

const generateToken = async function (name) {
  try {
    const secretkety = process.env.SECRETKEY;
    const payload = name;
    const token = jwt.sign(payload, secretkety);
    return token;
  } catch (err) {
    throw err;
  }
};

module.exports = { getUserByEmail, generateToken, createNewUser, updateToken };
