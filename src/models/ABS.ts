const Schema = mongoose.Schema

const absSubSchema = new Schema({
    _id: Schema.Types.ObjectId,
    date_of_injury: {
        type: Date,
        required: true
    },
    date_of_submission: {
        type: Date,
        required: true
    },
    total: {
        validate: {
            validator: Number.isInteger,
            message: 'Score total should be integer'
        },
        type: Number,
        required: true
    },
    patients: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
});

const absQuestionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    question_text: {
        type: String,
        required: true
    },
    question_num: {
        type: Number,
        required: true
    }
});

const absResSchema = new Schema({
    submissions: {
        type: Schema.Types.ObjectId,
        ref: 'ABSSubmission'
    },
    abs_questions: {
        type: Schema.Types.ObjectId,
        ref: 'ABSQuestion'
    },
    score: {
        validate: {
            validator: Number.isInteger,
            message: 'Score should be integer'
        },
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ABSSubmission', absSubSchema);
module.exports = mongoose.model('ABSQuestion', absQuestionSchema);
module.exports = mongoose.model('ABSResponse', absResSchema);