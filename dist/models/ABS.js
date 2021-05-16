"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Patient = require('./Patient');
var absResponseSchema = new Schema({
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
}, { versionKey: false, collection: 'abs.responses' });
var absSubmissionSchema = new Schema({
    period_of_observation_to: {
        type: Date,
        required: true,
    },
    period_of_observation_from: {
        type: Date,
        required: true,
    },
    observation_environment: {
        type: String,
    },
    examiner_initials: {
        type: String,
    },
    date_of_submission: {
        type: Date,
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
}, { versionKey: false, collection: 'abs.submissions' });
var ABSResponse = mongoose.model('ABSResponse', absResponseSchema);
var ABSSubmission = mongoose.model('ABSSubmission', absSubmissionSchema);
module.exports = {
    ABSSubmission: ABSSubmission,
    ABSResponse: ABSResponse,
};
//# sourceMappingURL=ABS.js.map