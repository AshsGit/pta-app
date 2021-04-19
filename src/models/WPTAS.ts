export {};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wptasResponseSchema = new Schema(
  {
    submissions: {
      type: Schema.Types.ObjectId,
      ref: 'WPTASSubmission',
    },
    wptas_questions: {
      type: Schema.Types.ObjectId,
      ref: 'WPTASQuestion',
    },
    score: {
      type: Number,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    correct_answer: {
      type: String,
      required: true,
    },
    is_multiple_choice: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { versionKey: false }
);

const WPTASResponse = mongoose.model('WPTASResponse', wptasResponseSchema);

const wptasSubmissionSchema = new Schema(
  {
    date_of_injury: {
      type: Date,
      max: Date.now,
      required: true,
    },
    date_of_submission: {
      type: Date,
      max: Date.now,
      required: true,
    },
    responses: [{ type: Schema.Types.ObjectId, ref: 'WPTASResponse' }],
    total: {
      validate: {
        validator: Number.isInteger,
        message: 'Score total should be integer',
      },
      type: Number,
      required: true,
    },
    examiner_initials: {
      type: String,
      required: true,
    },
    patients: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
  },
  { versionKey: false }
);

const wptasQuestionSchema = new Schema(
  {
    question_text: {
      type: String,
      required: true,
    },
    question_number: {
      type: Number,
      required: true,
    },
    img_src: {
      type: Schema.Types.ObjectId,
      ref: 'WPTASImage',
    },
  },
  { versionKey: false }
);

const wptasImageSchema = new Schema(
  {
    wptas_questions: {
      type: Schema.Types.ObjectId,
      ref: 'WPTASQuestion',
    },
    image_source: {
      data: Buffer,
      type: String,
    },
  },
  { versionKey: false }
);

const WPTASSubmission = mongoose.model(
  'WPTASSubmission',
  wptasSubmissionSchema
);
const WPTASQuestion = mongoose.model('WPTASQuestion', wptasQuestionSchema);
const WPTASImage = mongoose.model('WPTASImage', wptasImageSchema);

module.exports = {
  WPTASSubmission: WPTASSubmission,
  WPTASResopnse: WPTASResponse,
  WPTASQuestion: WPTASQuestion,
  WPTASImage: WPTASImage,
};
