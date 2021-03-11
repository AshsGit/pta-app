const mongoose = require('mongoose');


// Create Schema 
const PatientSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Patient', PatientSchema);