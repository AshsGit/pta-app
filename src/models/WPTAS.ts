export {}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const wptasSubSchema = new Schema({
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
    patients: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
});

export const wptasResSchema = new Schema({
    submissions: {
        type: Schema.Types.ObjectId,
        ref: 'WPTASSubmission'
    },
    wptas_questions: {
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

export const wptasQuesSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'WPTASImage'
    }
});

export const wptasImageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    wptas_questions: {
        type: Schema.Types.ObjectId,
        ref: 'WPTASQuestion'
    },
    image_source: {
        data: Buffer,
        type: String
    }
});


const WPTASSub = mongoose.model('WPTASSubmission', wptasSubSchema);
const WPTASRes = mongoose.model('WPTASResponse', wptasResSchema);
const WPTASQues = mongoose.model('WPTASQuestion', wptasQuesSchema);
const WPTASImage = mongoose.model('WPTASImage', wptasImageSchema);

module.exports = {
    WPTASSub: WPTASSub,
    WPTASRes: WPTASRes,
    WPTASQues: WPTASQues,
    WPTASImage: WPTASImage
};