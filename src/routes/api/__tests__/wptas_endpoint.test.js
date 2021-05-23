const request = require("supertest");
const mongoose = require('../../../mongoose_init');
const db_uri = require('../../../config/keys').testMongoURI;
mongoose.connect(db_uri);

const app = require('../../../app');
const {WPTASSubmission, WPTASResponse} = require('../../../models/WPTAS');

describe('WPTAS endpoint tests', () => {
    clearAll = async () => await Promise.all([
        WPTASResponse.deleteMany({}), 
        WPTASSubmission.deleteMany({})
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

    describe('WPTAS post request endpoints', () => {
        it('post a submission via: /api/wptas/submit', async (done) => {
            const answers = [...Array(12).keys()].map(key=>({
                questionNum: key+1,
                score: (key+1) % 4,
                multiChoiceGiven: (key+1) % 2 === 0,
            }));
            const total = answers.reduce((cur, answer)=>cur + answer.score, 0);

            const submission_data = {
                submissionDate: new Date(2019, 12, 20),
                examinerInitials: "TT",
                patientId: "test-patient",
                answers,
                total
            };

            await request(app)
                .post(`/api/wptas/submit`, submission_data)
                .send(submission_data)
                .expect(200)
                .catch(done.fail)
                .then(response => {
                    expect(response.body).toEqual(expect.objectContaining({
                        examiner_initials: "TT",
                        total,
                    }));
                    expect(new Date(response.body.date_of_submission).getDay()).toBe((new Date()).getDay());
                    expect(response.body.responses.length).toBe(12);
                });
            
            done();
        });
    });

    describe("WPTAS get request endpoints", () => {
        it('get a single submission via: /api/wptas/lastSubmission/:patientId', async (done) => {
            const answers = [...Array(12).keys()].map(key=>({
                questionNum: key+1,
                score: (key+1) % 4,
                multiChoiceGiven: (key+1) % 2 === 0,
            }));
            const total = answers.reduce((cur, answer)=>cur + answer.score, 0);

            const submission_data = {
                submissionDate: new Date(2019, 12, 20),
                examinerInitials: "TT",
                patientId: "test-patient",
                answers,
                total
            };

            await request(app)
                .post(`/api/wptas/submit`, submission_data)
                .send(submission_data)
                .expect(200)
                .catch(done.fail)
                .then(async response => {
                    await request(app)
                        .get(`/api/wptas/lastSubmission/${response.body.patient}`)
                        .expect(200)
                        .then(response2 => {
                            expect(response2.body.length).toBe(1); //list of 1 submission should be returned
                            const submission = response2.body[0];
                            expect(submission).toEqual(expect.objectContaining({
                                _id: response.body._id,
                                examiner_initials: "TT",
                                total,
                                responses: expect.arrayContaining(response.body.responses)
                            }));
                            expect(new Date(submission.date_of_submission).getDay()).toBe((new Date()).getDay());
                            expect(submission.responses.length).toBe(12);
                        });
                });

            done();
        });
        it('get a single submission via: /api/wptas/submission/:submissionId', async (done) => {
            const answers = [...Array(12).keys()].map(key=>({
                questionNum: key+1,
                score: (key+1) % 4,
                multiChoiceGiven: (key+1) % 2 === 0,
            }));
            const total = answers.reduce((cur, answer)=>cur + answer.score, 0);

            const submission_data = {
                submissionDate: new Date(2019, 12, 20),
                examinerInitials: "TT",
                patientId: "test-patient",
                answers,
                total
            };

            await request(app)
                .post(`/api/wptas/submit`, submission_data)
                .send(submission_data)
                .expect(200)
                .catch(done.fail)
                .then(async response => {
                    await request(app)
                        .get(`/api/wptas/submission/${response.body._id}`)
                        .expect(200)
                        .then(response2 => {
                            const submission = response2.body;
                            expect(submission).toEqual(expect.objectContaining({
                                _id: response.body._id,
                                examiner_initials: "TT",
                                total,
                            }));
                            expect(new Date(submission.date_of_submission).getDay()).toBe((new Date()).getDay());
                            expect(submission.responses.length).toBe(12);
                            expect(submission.responses.map(({_id})=>_id))
                                .toEqual(expect.arrayContaining(response.body.responses));
                        });
                });
            
            done();
        });
        
        it('get all patient submissions via: /api/wptas/submissions/:patientId', async (done) => {
            const answers = shift => [...Array(12).keys()].map(key=>({
                questionNum: key+1,
                score: (key+1+shift) % 4,
                multiChoiceGiven: (key+1) % 2 === 0,
            }));
            const total = answers => answers.reduce((cur, answer)=>cur + answer.score, 0);

            const submission_data = [...Array(3).keys()].map(shift=>({
                submissionDate: new Date(2019, 12, 20+shift),
                examinerInitials: `T${shift}`,
                patientId: "test-patient",
                answers: answers(shift),
                total: total(answers(shift))
            }));

            const submit_responses = [];

            await Promise.all(submission_data.map(async submission => 
                await request(app)
                    .post(`/api/wptas/submit`, submission)
                    .send(submission)
                    .expect(200)
                    .catch(done.fail)
                    .then(res => submit_responses.push(res.body))
            ));

            await request(app)
                .get(`/api/wptas/submissions/${submit_responses[0].patient}`)
                .expect(200)
                .catch(done.fail)
                .then(response => {
                    const submissions = response.body;
                    expect(submissions.length).toBe(3);
                    expect(submissions).toEqual(expect.arrayContaining(
                        submit_responses.map(({
                            _id, 
                            examiner_initials,
                            total
                        })=>expect.objectContaining({
                            _id, 
                            examiner_initials,
                            total
                        }))
                    ));
                    submissions.forEach(submission => {
                        expect(new Date(submission.date_of_submission).getDay()).toBe((new Date()).getDay());
                        expect(submission.responses.length).toBe(12);
                        expect(submit_responses.map(({responses}) => responses))
                            .toContainEqual(submission.responses.map(({_id})=>_id))
                    });
                });

            done();
        });
    });
});



  