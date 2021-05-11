export {};
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { WPTASSubmission, WPTASResponse } = require('../../models/WPTAS');

// @route GET api/wptas/submissions/:id
// @desc get submissions for a patient id
// @access Public
router.get('/submissions/:patientId', async (req: any, res: any) => {
  WPTASSubmission.find({ patient: req.params.patientId })
    .sort([['date_of_submission', 1]])
    .populate('responses')
    .exec((err, submissions) => {
      if (err) {
        res.status(400).json({ msg: err.message });
        return;
      }
      res.status(200).json(submissions);
    });
});

// @route GET api/wptas/submission/:patientId
// @desc get a submission by submission id
// @access Public
router.get('/submission/:id', async (req, res) => {
  WPTASSubmission.findOne({ _id: req.params.id })
    .populate('responses')
    .exec((err, submission) => {
      if (err) {
        res.status(400).json({ msg: err.message });
        return;
      }
      res.status(200).json(submission);
    });
});

// @route GET api/wptas/lastSubmission/:id
// @desc get the most recent wptas submisison for a patient
// @access Public
router.get('/lastSubmission/:patientId', async (req, res) => {
  WPTASSubmission.find({ patient: req.params.patientId })
    .sort([['date_of_submission', -1]])
    .limit(1)
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

  try {
    // Store responses
    const responses = await WPTASResponse.insertMany(
      newResponses.map(({ questionNum, score, multiChoiceGiven }) => ({
        question_num: questionNum,
        multiple_choice_given: multiChoiceGiven,
        score,
      }))
    );

    let { examinerInitials, patientId, total } = newSubmission;

    const submission = await WPTASSubmission.create({
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
