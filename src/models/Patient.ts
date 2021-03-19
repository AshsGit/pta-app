const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const PatientSchema = new Schema({
    _id: Schema.Types.ObjectID,
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Patient', PatientSchema);