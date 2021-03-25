const { absSubSchema } = require('../../models/ABS.ts');
const { absQuestionSchema } = require('../../models/WPTAS.ts');
const { absResSchema } = require('../../models/WPTAS.ts');

// @route   GET api/abs/questions
// @desc    Get all questions
// @access  Public
router.get('/questions', (req: any, res: any) => {
    absQuestionSchema.find(function (err: any, questions: any) {
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
    absQuestionSchema.create(newQuestionDetails, function(err: any, question: any) {
        if (err) return res.status(400).json(err);
        res.json(question);
    });
});

// @route GET api/abs/submission/:id
// @desc get a submission
// @access Public
router.get('/submissions/:id', (req: any, res: any) => {
    absSubSchema.findOne({_id: req.params.id})
        .populate('patients')
        .exec(function (err, submission) {
            if (err) return res.status(400).json(err);
            if (!submission) return res.status(404).json();

            res.json(submission);
        });
});