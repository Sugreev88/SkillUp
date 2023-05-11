const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    maxlength: 200,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    // select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
  },
  token: {
    type: String,
  },
  otp: {
    type: String,
    expires: 300,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
