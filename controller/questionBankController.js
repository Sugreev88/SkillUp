const Question = require("../model/questionBankSchema");
const service = require("../service/questionBankService");
const express = require("express");

exports.createQuestion = async (req, res) => {
  try {
    const { title, answer, optiions, type } = req.body;
    const question = new Question({ title, answer, optiions, type });
    let result = await question.save();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
