const absSubSchema = new Schema({
    _id: Schema.Types.ObjectId,
    date_of_injury: {
        type: Date,
        max: Date.now,
        required: true
    },
    date_of_submission: {
        type: Date,
        max: Date.now,
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
    patient_id: {
        type: Schema.Types.ObjectId,
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
    submission_id: {
        type: Schema.Types.ObjectId,
        ref: 'ABSSubmission'
    },
    abs_question_id: {
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