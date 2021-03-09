import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create Schema 
const PatientSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Patient = mongoose.model('patient', PatientSchema);

module.exports = Patient;