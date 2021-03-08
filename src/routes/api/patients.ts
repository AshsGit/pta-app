import express from 'express';
const router = express.Router();

const Patient = require('../../models/Patient');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
    Patient.find()
        .then((patients: any) => res.json(patients))
});
 
// @route   POST api/items
// @desc    Create an item
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Patient({
        name: req.body.name
    });

    newItem.save().then(res.json);
});

// @route   DELETE api/items
// @desc    Delete an item
// @access  Public
router.delete('/:id', (req, res) => {
    Patient.findById(req.params.id)
        .then(patient => patient.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false, error: err}))
})

// @route   DELETE api/items/
// @desc    Delete all item
// @access  Public
/*router.delete('/', (req, res) => {
    Item.deleteMany((_: string)=>true);
    res.json({success: true});
})*/

module.exports = router;