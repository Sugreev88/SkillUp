const mongoose = require("mongoose");
const User = require("../model/userSchema");

const getUserByEmail = async function (email) {
  try {
    const emailid = email;
    let result = await User.findOne({ email: emailid });
    if (!result) throw new Error("Invalid Email!!!!!!!");
    return result;
  } catch (err) {
    throw err;
  }
};

const createNewUser = async function (user) {
  try {
    let result = await user.save();
    const user_id = result._id;
    return user_id;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUserByEmail,
  createNewUser,
};
