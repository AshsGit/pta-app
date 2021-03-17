import express from 'express';
const router = express.Router();

const Patient = require('../../models/Patient');

// @route   GET api/patients
// @desc    Get all patients
// @access  Public
router.get('/', (req, res) => {
    Patient.find()
        .then((patients: any) => res.json(patients))
});
 
// @route   POST api/patients
// @desc    Create a patient
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Patient({
        name: req.body.name
    });

    newItem.save().then(res.json);
});

// @route   DELETE api/patients
// @desc    Delete a patient
// @access  Public
router.delete('/:id', (req, res) => {
    Patient.findById(req.params.id)
        .then(patient => patient.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false, error: err}))
})

module.exports = router;