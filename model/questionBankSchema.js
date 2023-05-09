const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 500,
  },
  options: {
    type: [String],
    required: true,
    enum: ["A", "B", "C", "D"], // Enum array for options field
  },
  answer: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D"], // Enum array for answer field
  },
  type: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    enum: ["easy", "medium", "hard"], // Enum array for type field
  },
});

module.exports = mongoose.model("Question", questionSchema);
