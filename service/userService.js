const mongoose = require("mongoose");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const client = require("twilio")(
  process.env.ACCOUNT_SSID,
  process.env.AUTH_KEY
);
const bcrypt = require("bcrypt");

const getUserByEmail = async function (email) {
  try {
    console.log(email);
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

// const generateOtp = async function (phone, email) {
//   try {
//     // const Email = email;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     // console.log(typeof otp);

//     // console.log(otp);
//     await User.findByIdAndUpdate(email, otp, { new: true });
//     return await client.messages.create({
//       body: `${otp}`,
//       from: "+12706068167",
//       to: `+${phone}`,
//     });
//   } catch (err) {
//     throw err;
//   }
// };

// const bcrypt = require('bcrypt');

// const updateUserPassword = async function(userId, newPassword) {
//   try {
//     const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password using bcrypt
//     const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true }); // Update the user's password with the hashed password
//     return updatedUser;
//   } catch (err) {
//     throw err;
//   }
// };

const updatePasswordToDb = async function (email, password, otp) {
  const user = await getUserByEmail(email);
  if (user.otp !== otp) throw new Error("invalid otp");
  const hashedPassword = await bcrypt.hash(password, 10);
  const message = await User.updateOne(
    { email },
    { password: hashedPassword },
    { upsert: true }
  );
  return message;
};

const generateOtp = async function (phone, email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const validUser = await getUserByEmail(email);
  console.log(validUser.otp);
  console.log(validUser);
  if (!validUser) throw new Error("email does not exist");
  await User.updateOne({ email }, { otp }, { upsert: true });
  const message = await client.messages.create({
    body: `${otp}`,
    from: "+12706068167",
    to: `+${phone}`,
  });
  return message;
};

const generateToken = async function (name) {
  try {
    const secretkety = process.env.SECRETKEY;
    // const payload = name;
    const token = jwt.sign(name, secretkety);
    return token;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUserByEmail,
  generateToken,
  createNewUser,
  updateToken,
  generateOtp,
  updatePasswordToDb,
};
