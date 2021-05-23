const request = require("supertest");
const mongoose = require('../../../mongoose_init');
const db_uri = require('../../../config/keys').testMongoURI;
mongoose.connect(db_uri);

const app = require('../../../app');
const Patient = require('../../../models/Patient');

describe('Patient endpoint tests', () => {
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

    describe('Patient post request endpoints', () => {
        it('create a patient via: /api/patient', async (done) => {
            await request(app)
                .post(`/api/patient`)
                .expect(200)
                .catch(done.fail)

            done();
        });
    });

    describe("Patient get request endpoints", () => {
        it('get all patients via: /api/patient', async (done) => {
            const create_patient = async () => 
                await request(app)
                    .post(`/api/patient`)
                    .expect(200)
                    .catch(done.fail);

            await Promise.all([
                create_patient(),
                create_patient(),
                create_patient(),
            ]);

            await request(app)
                .get(`/api/patient`)
                .expect(200)
                .catch(done.fail)
                .then(response => {
                    expect(response.body.length).toBe(3);
                });

            done();
        });

        it('get a single patient via: /api/patient/:id', async (done) => {
            const create_patient = async () => 
                await request(app)
                    .post(`/api/patient`)
                    .expect(200)
                    .catch(done.fail);
 
            await create_patient();
            const patient = await create_patient();
            await create_patient();

            await request(app)
                .get(`/api/patient/${patient.body._id}`)
                .expect(200)
                .catch(done.fail);

            done();
        });
    });
});



  