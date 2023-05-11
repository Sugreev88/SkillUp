const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const client = require("twilio")(
  process.env.ACCOUNT_SSID,
  process.env.AUTH_KEY
);
const bcrypt = require("bcrypt");
const user_service = require("../service/userService");

const updateToken = async function (id, Token) {
  let result = await User.findOneAndUpdate({ _id: id }, { token: Token });
  return result;
};

const updatePasswordToDb = async function (email, password, otp) {
  const user = await user_service.getUserByEmail(email);
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
  const validUser = await user_service.getUserByEmail(email);
  if (!validUser) throw new Error("email does not exist");
  await User.updateOne({ email }, { otp }, { upsert: true });
  const message = await client.messages.create({
    body: `${otp}`,
    from: "+12706068167",
    to: `+${phone}`,
  });
  return message;
};

const generateToken = async function (email) {
  try {
    const secretkety = process.env.SECRETKEY;
    const token = jwt.sign(email, secretkety);
    return token;
  } catch (err) {
    throw err;
  }
};

const verifyToken = async function (token, email) {
  const validMail = await user_service.getUserByEmail(email);
  if (!validMail) throw new Error("user does not exist");
  const result = await jwt.verify(token, process.env.SECRETKEY);
  if (result !== email) throw new Error("Invalid token");
  return result;
};

const verifyPassword = async function (password, userPassword) {
  const checkPassword = await bcrypt.compare(password, userPassword);
  if (!checkPassword) throw new Error("Invalid credentials");
  return checkPassword;
};

module.exports = {
  generateToken,
  updateToken,
  generateOtp,
  updatePasswordToDb,
  verifyToken,
  verifyPassword,
};
