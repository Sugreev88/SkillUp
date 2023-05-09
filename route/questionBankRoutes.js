const express = require("express");
const router = express.Router();
const { createQuestion } = require("../controller/questionBankController");

// create a question
router.route("/questions").post(createQuestion);

module.exports = router;
