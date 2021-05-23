const mongoose = require('../../mongoose_init');
const db_uri = require('../../config/keys').testMongoURI;
mongoose.connect(db_uri);

const Patient = require('../Patient');

describe('Patient model tests', () => {
    clearAll = async () => await Promise.all([
        Patient.deleteMany({}), 
    ]);

    beforeAll(async () => {
        await clearAll();
    });
    afterEach(async () => {
        await clearAll();
    });
    afterAll(async () => {
        await mongoose.connection.close();
    })

    it('Model exists', () => { 
        expect(Patient).toBeDefined();
    }); 

    it('create a patient', async () => {
        const patient = new Patient();
        const saved_patient = await patient.save();
        expect(saved_patient._id).toBeDefined();
    });
    it('get a patient', async () => {
        const patient = new Patient();
        const saved_patient = await patient.save();
        
        const get_patient = await Patient.findOne({_id: saved_patient._id});
        expect(get_patient._id).toEqual(saved_patient._id);
    });
});
