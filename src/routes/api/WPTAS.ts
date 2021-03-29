export {}
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { WPTASSub } = require('../../models/WPTAS');
const { WPTASRes } = require('../../models/WPTAS');
const { WPTASQues } = require('../../models/WPTAS');
const { WPTASImage } = require('../../models/WPTAS');


// @route   GET api/wptas/questions
// @desc    Get all items
// @access  Public
router.get('/questions', (req, res) => {
    WPTASQues.find(function (err, questions) {
        if (err) {
            return res.json(err);
        } else {
            res.json(questions);
        }
    });
});


// @route POST api/wptas/questions
// @desc Create a question
// @access Public
router.post('/questions', (req, res) => {
    let newQuestionDetails = req.body;
    newQuestionDetails._id = new mongoose.Types.ObjectId();
    let question = new WPTASQues(newQuestionDetails);
    question.save(function(err: any) {
        question.save(function(err: any) {
            console.log('Done');
            res.json(question);
        });
    });
});

// @route GET api/wptas/submission/:id
// @desc Get a submission
// @access Public
router.get('/submission/:id', (req,res) => {
    WPTASSub.findOne({_id: req.params.id})
        .populate('patients')
        .exec(function(err, submission) {
            if (err) return res.status(400).json(err);
            if (!submission) return res.status(404).json();

            res.json(submission);
        });
});

// @route GET api/wptas/images
// @desc get all images
// @access Public
router.get('/images', (req,res) => {
    WPTASImage.find((err, images) => {
        if (err) {
            return res.json(err);
        } else {
            res.json(images)
        }
    });
});

// @route GET api/wptas/images/:id
// @desc get an images
// @access Public
router.get('/images/:id', (req, res) => {
    WPTASImage.findOne({_id: req.params.id})
        .populate('wptas_questions')
        .exec(function (err, image) {
            if (err) return res.status(400).json(err);
            if (!image) return res.status(404).json();

            res.json(image);
        });
});

module.exports = router;