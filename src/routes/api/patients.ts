export {}
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Patient = require('../../models/Patient');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req: any, res: any) => {
    Patient.find()
        .then((patients: any) => res.json(patients))
});


// @route   DELETE api/items
// @desc    Delete an item
// @access  Public
router.delete('/:id', (req: any, res: any) => {
    Patient.findById(req.params.id)
        .then((patient: any) => patient.remove().then(() => res.json({success: true})))
        .catch((err: any) => res.status(404).json({success: false, error: err}));
});

// @route POST api/patient/
// @desc Create a patient
// @access Public
router.post('/', (req: any, res: any) => {
    let newPatientDetails = req.body;
    newPatientDetails._id = new mongoose.Types.ObjectId();
    let patient = new Patient(newPatientDetails);
    patient.save(function(err: any) {
        console.log('Done');
        res.json(patient);
    });
});

// @route GET api/patient/:id
// @desc get patient with id
// @access Public
router.get('/:id', (req: any, res: any) => {
    Patient.findOne({_id: req.params.id})
        .exec(function(err: any, patient: any) {
            if (err) return res.json(err);
            if (!patient) return res.json();
            res.json(patient);
        });
});

module.exports = router;