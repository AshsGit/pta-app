export {};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Patient = require('./Patient');

const absResponseSchema = new Schema(
  {
    submissions: {
      type: Schema.Types.ObjectId,
      ref: 'ABSSubmission',
    },
    abs_questions: {
      type: Schema.Types.ObjectId,
      ref: 'ABSQuestion',
    },
    score: {
      validate: {
        validator: Number.isInteger,
        message: 'Score should be integer',
      },
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);
const ABSResponse = mongoose.model('ABSResponse', absResponseSchema);

const absSubmissionSchema = new Schema(
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
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
    responses: [{ type: Schema.Types.ObjectId, ref: 'ABSResponse' }],
  },
  { versionKey: false }
);

const ABSSubmission = mongoose.model('ABSSubmission', absSubmissionSchema);

const absQuestionSchema = new Schema(
  {
    question_text: {
      type: String,
      required: true,
    },
    question_num: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const ABSQuestion = mongoose.model('ABSQuestion', absQuestionSchema);

module.exports = {
  ABSSubmission: ABSSubmission,
  ABSQuestion: ABSQuestion,
  ABSResponse: ABSResponse,
};
