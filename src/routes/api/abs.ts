export {}
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { ABSSub } = require('../../models/ABS');
const { ABSQues } = require('../../models/ABS');
const { ABSRes } = require('../../models/ABS');

// @route   GET api/abs/questions
// @desc    Get all questions
// @access  Public
router.get('/questions', (req: any, res: any) => {
    ABSQues.find(function (err: any, questions: any) {
        if (err) {
            return res.json(err);
        } else {
            res.json(questions);
        }
    });
});

// @route POST api/abs/questions
// @desc create a question
// @access Public
router.post('/questions', (req: any, res: any) => {
    let newQuestionDetails = req.body;
    newQuestionDetails._id = new mongoose.Types.ObjectId();
    let question = new ABSQues(newQuestionDetails);
    question.save(function(err: any) {
        console.log('Done');
        res.json(question);
    });
});

// @route GET api/abs/submission/:id
// @desc get a submission
// @access Public
router.get('/submissions/:id', (req: any, res: any) => {
    ABSSub.findOne({_id: req.params.id})
        .populate('patients')
        .exec(function (err, submission) {
            if (err) return res.status(400).json(err);
            if (!submission) return res.status(404).json();

            res.json(submission);
        });
});

module.exports = router;