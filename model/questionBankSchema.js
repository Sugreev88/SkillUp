const { default: mongoose } = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 500,
  },
  options: {
    type: [String],
    trim: true,
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 4;
      },
      return: { message: "Array must have a length of 4" },
    },
  },
  answer: {
    type: String,
    required: true,
    enum: [],
    validate: {
      validator: function (v) {
        return this.options.includes(v);
      },
      message: "Answer must be one of the options",
    },
  },
  type: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    enum: ["easy", "medium", "hard"],
  },
});

module.exports = mongoose.model("Question", questionSchema);
