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

// @route POST api/patient/
// @desc Create a patient
// @access Public
router.post('/', (req: any, res: any) => {
    let newPatientDetails = req.body;
    newPatientDetails._id = new mongoose.Types.ObjectId();
    let patient = new Patient({
        _id: newPatientDetails._id,
        name: newPatientDetails.name
    });
    patient.save(function(err) {
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