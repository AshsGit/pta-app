export {};
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { WPTASSubmission, WPTASResponse } = require('../../models/WPTAS');

// // @route   GET api/wptas/questions
// // @desc    Get all items
// // @access  Public
// router.get('/questions', (req, res) => {
//     WPTASQues.find(function (err, questions) {
//         if (err) {
//             return res.json(err);
//         } else {
//             res.json(questions);
//         }
//     });
// });

// // @route POST api/wptas/questions
// // @desc Create a question
// // @access Public
// router.post('/questions', (req, res) => {
//     let newQuestionDetails = req.body;
//     newQuestionDetails._id = new mongoose.Types.ObjectId();
//     let question = new WPTASQues(newQuestionDetails);
//     question.save(function(err: any) {
//         question.save(function(err: any) {
//             console.log('Done');
//             res.json(question);
//         });
//     });
// });

// @route GET api/wptas/submissions/:id
// @desc get submissions for a patient id
// @access Public
router.get('/submissions/:patientId', async (req: any, res: any) => {
  try {
    const submissions = await WPTASSubmission.find({ patient: req.params.id });
    res.status(200).json(submissions);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route GET api/wptas/submission/:id
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
  // try {
  //   const patient = await WPTASSubmission.findOne({
  //     _id: req.params.id,
  //   })
  //   res.status(200).json(patient);
  // } catch (e) {
  //   res.status(400).json({ msg: e.message });
  // }
});

// // @route GET api/wptas/images
// // @desc get all images
// // @access Public
// router.get('/images', (req, res) => {
//   WPTASImage.find((err, images) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       res.json(images);
//     }
//   });
// });

// // @route GET api/wptas/images/:id
// // @desc get an images
// // @access Public
// router.get('/images/:id', (req, res) => {
//   WPTASImage.findOne({ _id: req.params.id })
//     .populate('wptas_questions')
//     .exec(function (err, image) {
//       if (err) return res.status(400).json(err);
//       if (!image) return res.status(404).json();

//       res.json(image);
//     });
// });

module.exports = router;
