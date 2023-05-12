const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  deleteQuestion,
  createQuestion,
  UpdateQuestion,
} = require("../controller/questionBankController");

router.route("/createQuestion").post(createQuestion);
router.route("/getAllQuestions").get(getAllQuestions);
router.route("/removeQuestion").delete(deleteQuestion);
router.route("/updateQuestion/:id").put(UpdateQuestion);

module.exports = router;
