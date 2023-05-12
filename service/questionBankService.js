const Question = require("../model/questionBankSchema");
// const User = require("../model/userSchema");
exports.getAllQuestions = async () => {
  try {
    const result = await Question.find();
    return result;
  } catch (error) {
    throw new Error("cannot get quesions");
  }
};

exports.deleteQuestion = async (questionid) => {
  const questionExists = await Question.exists({ _id: questionid });

  if (!questionExists) {
    return { message: "Question not found" };
  }

  try {
    const deletedQuestion = await Question.findByIdAndDelete(questionid);
    return deletedQuestion;
  } catch {
    throw new Error("failed to delete question");
  }
};

exports.createQuestion = async function (question) {
  try {
    return await question.save();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create question");
  }
};

exports.updateQuestion = async (questionId, updatedData) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      updatedData,
      { new: true }
    );
    if (!updatedQuestion) {
      return { success: false, message: "Question not found" };
    }
    return { success: true, updatedQuestion };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error updating question" };
  }
};
