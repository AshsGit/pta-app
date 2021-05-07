export {};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wptasResponseSchema = new Schema(
  {
    question_num: {
      type: Number,
      required: true,
    },
    score: {
      validate: {
        validator: Number.isInteger,
        message: 'Score should be integer',
      },
      type: Number,
      required: true,
    },
    answer: {
      type: String,
      required: false,
    },
    multiple_choice_given: {
      validate: {
        validator: (val: any) => typeof val === "boolean",
        message: "multiple_choice_given should be boolean"
      },
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false, collection: 'wptas.responses' }
);

const wptasSubmissionSchema = new Schema(
  {    
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
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
  },
  { versionKey: false, collection: 'wptas.submissions' }
);

const WPTASResponse = mongoose.model('WPTASResponse', wptasResponseSchema);

const WPTASSubmission = mongoose.model(
  'WPTASSubmission',
  wptasSubmissionSchema
);

module.exports = {
  WPTASSubmission: WPTASSubmission,
  WPTASResopnse: WPTASResponse,
};
