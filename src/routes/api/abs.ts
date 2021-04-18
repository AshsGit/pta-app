export {};
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
  ABSSubmission.find({ patient: req.params.patientId })
    .sort([['date_of_submission', 1]])
    .populate('responses')
    .exec((err, submissions) => {
      if (err) {
        res.status(400).json({ msg: err.message });
        return;
      }
      res.status(200).json(submissions);
    });
  // try {
  //   const submissions = await ABSSubmission.find({
  //     patient: ObjectId(req.params.patientId),
  //   }); // TODO BROKEN
  //   console.log('SRERVER', submissions);
  //   res.status(200).json(submissions);
  // } catch (e) {
  //   res.status(400).json({ msg: e.message });
  // }
});

// @route GET api/abs/submission/:id
// @desc get a submission by submission id
// @access Public
router.get('/submission/:id', (req: any, res: any) => {
  ABSSubmission.findOne({ _id: req.params.id })
    .populate('responses')
    .exec((err, submission) => {
      if (err) {
        res.status(400).json({ msg: err.message });
        return;
      }
      res.status(200).json(submission);
    });
});

router.post('/submit', async (req: any, res: any) => {
  let newSubmission = req.body;
  let newResponses = newSubmission.answers;

  if (!newSubmission.answers || !newSubmission.patientId) {
    res.status(400).json({ msg: 'Missing submission information.' });
    return;
  }

  newSubmission.total = newResponses.reduce((acc, { score }) => acc + score, 0);
  delete newSubmission.responses;
  delete newSubmission.submissionId;
  try {
    // Store responses
    const responses = await ABSResponse.insertMany(
      newResponses.map(({ questionNum, score }) => ({
        question_num: questionNum,
        score,
      }))
    );

    let {
      periodOfObs_to,
      periodOfObs_from,
      obsEnv,
      examinerInitials,
      patientId,
      total,
    } = newSubmission;

    const submission = await ABSSubmission.create({
      period_of_observation_to: periodOfObs_to,
      period_of_observation_from: periodOfObs_from,
      observation_environment: obsEnv,
      examiner_initials: examinerInitials,
      date_of_submission: new Date(),
      total,
      patient: patientId,
      responses: responses.map(({ _id }) => _id),
    });

    res.status(200).json(submission);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
