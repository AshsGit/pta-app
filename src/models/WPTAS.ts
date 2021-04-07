export {};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const wptasSubmissionSchema = new Schema(
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

export const wptasResponseSchema = new Schema(
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

export const wptasQuestionSchema = new Schema(
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

export const wptasImageSchema = new Schema(
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
const WPTASResopnse = mongoose.model('WPTASResponse', wptasResponseSchema);
const WPTASQuestion = mongoose.model('WPTASQuestion', wptasQuestionSchema);
const WPTASImage = mongoose.model('WPTASImage', wptasImageSchema);

module.exports = {
  WPTASSubmission: WPTASSubmission,
  WPTASResopnse: WPTASResopnse,
  WPTASQuestion: WPTASQuestion,
  WPTASImage: WPTASImage,
};
