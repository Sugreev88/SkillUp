const service = require("../service/questionBankService");
const question = require("../model/questionBankSchema");

exports.getAllQuestions = async (req, res) => {
  try {
    const result = await service.getAllQuestions();
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    // const userid = req.body;
    // console.log(userid);
    const { questionid } = req.body;
    console.log(questionid);
    await service.deleteQuestion(questionid);
    res.status(201).json({ message: "question deleted succesfully" });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const { title, options, answer, type } = req.body;
    const newQuestion = new question({ title, options, answer, type });
    await service.createQuestion(newQuestion);
    res.status(200).send("Question created succesfully");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.UpdateQuestion = async (req, res) => {
  try {
    const questionid = req.params.id;
    const questionBody = req.body;
    const question = await service.updateQuestion(questionid, questionBody);
    res.send(question);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
