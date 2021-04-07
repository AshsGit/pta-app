export {};
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { ABSSubmission } = require('../../models/ABS');
const { ABSQuestion } = require('../../models/ABS');
const { ABSResponse } = require('../../models/ABS');

// @route   GET api/abs/questions
// @desc    Get all questions
// @access  Public
router.get('/questions', (req: any, res: any) => {
  ABSQuestion.find(function (err: any, questions: any) {
    if (err) {
      return res.json(err);
    } else {
      res.json(questions);
    }
  });
});

// // @route POST api/abs/questions
// // @desc create a question
// // @access Public
// router.post('/questions', (req: any, res: any) => {
//   let newQuestionDetails = req.body;
//   newQuestionDetails._id = new mongoose.Types.ObjectId();
//   let question = new ABSQuestion(newQuestionDetails);
//   question.save(function (err: any) {
//     console.log('Done');
//     res.json(question);
//   });
// });

// @route GET api/abs/submissions/:id
// @desc get submissions for a patient id
// @access Public
router.get('/submissions/:patientId', async (req: any, res: any) => {
  try {
    const patients = await ABSSubmission.find({ patient: req.params.id });
    res.status(200).json(patients);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route GET api/abs/submission/:id
// @desc get a submission by submission id
// @access Public
router.get('/submission/:id', async (req: any, res: any) => {
  try {
    const patient = await ABSSubmission.findOne({ _id: req.params.id });
    res.status(200).json(patient);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
