const { wptasSubSchema } = require('../../models/WPTAS.ts');
const { wptasResSchema } = require('../../models/WPTAS.ts');
const { wptasQuesSchema } = require('../../models/WPTAS.ts');
const { wptasImageSchema } = require('../../models/WPTAS.ts');


// @route   GET api/WPTAS
// @desc    Get all items
// @access  Public
router.get('/questions', (req, res) => {
    wptasQuesSchema.find(function (err, questions) {
        if (err) {
            return res.json(err);
        } else {
            res.json(questions);
        }
    });
});

router.post('/questions', (req, res) => {
    let newQuestionDetails = req.body;
    wptasQuesSchema.create(newQuestionDetails, function(err, question) {
        if (err) return res.status(400).json(err);
        res.json(question);
    });
});

router.get('/submission/:id', (req,res) => {
    wptasSubSchema.findOne({_id: req.params.id})
        .populate('patients')
        .exec(function(err, submission) {
            if (err) return res.status(400).json(err);
            if (!submission) return res.status(404).json();

            res.json(submission);
        });
});

router.get('/images', (req,res) => {
    wptasImageSchema.find((err, images) => {
        if (err) {
            return res.json(err);
        } else {
            res.json(images)
        }
    });
});

router.get('/images/:id', (req, res) => {
    wptasImageSchema.findOne({_id: req.params.id})
        .populate('wptas_questions')
        .exec(function (err, image) {
            if (err) return res.status(400).json(err);
            if (!image) return res.status(404).json();

            res.json(image);
        });
});