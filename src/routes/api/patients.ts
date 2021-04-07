export {};
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Patient = require('../../models/Patient');

// @route   GET api/patients
// @desc    Get all patients
// @access  Public
router.get('/', (req: any, res: any) => {
  Patient.find().then((patients: any) => res.json(patients));
});

// @route POST api/patient/
// @desc Create a patient
// @access Public
router.post('/', async (req: any, res: any) => {
  const newPatient = new Patient({});
  try {
    const item = await newPatient.save();
    if (!item) throw Error('Something went wrong saving the item');

    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route GET api/patient/:id
// @desc get patient with id
// @access Public
router.get('/:id', async (req: any, res: any) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id });
    res.status(200).json(patient);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
