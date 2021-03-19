const wptasSubSchema = new Schema({
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
    examiner_initials: {
        type: String,
        required: true
    },
    patient_id: {
        type: Schema.Types.Objectid,
        ref: 'Patient'
    }
});

const wptasResSchema = new Schema({
    submission_id: {
        type: Schema.Types.ObjectId,
        ref: 'WPTASSubmission'
    },
    wptas_question_id: {
        type: Schema.Types.ObjectId,
        ref: 'WPTASQuestion'
    },
    score: {
        type: Number,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    },
    is_multiple_choice: {
        type: Boolean,
        required: true,
        default: false
    }
});

const wptasQuesSchema = new Schema({
    _id: Schema.Types.ObjectId,
    question_text: {
        type: String,
        required: true
    },
    question_number: {
        type: Number,
        required: true
    },
    img_src: {
        type: Schema.Types.Objectid,
        ref: 'WPTASImage'
    }
});

const wptasImageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    wptas_question_id: {
        type: Schema.Types.ObjectId,
        ref: 'WPTASQuestion'
    },
    image_source: {
        data: Buffer,
        type: String
    }
});

module.exports = mongoose.model('WPTASSubmission', wptasSubSchema);
module.exports = mongoose.model('WPTASResponse', wptasResSchema);
module.exports = mongoose.model('WPTASQuestion', wptasQuesSchema);
module.exports = mongoose.model('WPTASImage', wptasImageSchema);