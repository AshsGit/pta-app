const mongoose = require('../../mongoose_init');
const db_uri = require('../../config/keys').testMongoURI;
mongoose.connect(db_uri);

const {ABSSubmission, ABSResponse} = require('../ABS');

describe('ABS model tests', () => {
    clearAll = async () => await Promise.all([
        ABSResponse.deleteMany({}), 
        ABSSubmission.deleteMany({})
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

    it('Models exist', () => { 
        expect(ABSSubmission).toBeDefined();
        expect(ABSResponse).toBeDefined();
    }); 

    describe('ABSResponse model tests', () => {
        it('save a response', async () => {
            const data = {
                question_num: 3, 
                score: 4
            };

            const response = new ABSResponse(data);
            const saved_response = await response.save();
            expect(saved_response).toEqual(expect.objectContaining(data));
        });
        it('get a response', async () => {
            const data = {
                question_num: 3, 
                score: 4
            };

            const response = new ABSResponse(data);
            const saved_response = await response.save();
            
            const get_response = await ABSResponse.findOne({_id: saved_response._id});
            expect(get_response).toEqual(expect.objectContaining(data));
        });
    });
    
    describe('ABSSubmission model tests', () => {
        const create_response_data = () => {
            const response_data = [...Array(14).keys()].map(key=>({
                question_num: key+1,
                score: (key+1) % 4,
            }));
            const total = response_data.reduce((cur, response)=>cur + response.score, 0);
            return {response_data, total};
        };

        it('save a submission', async () => {
            const {response_data, total} = create_response_data();
            const responses = await ABSResponse.insertMany(response_data);
            
            expect(responses).toEqual(response_data.map(expect.objectContaining));

            const submission_data = { 
                period_of_observation_to: new Date(2019, 12, 20),
                period_of_observation_from: new Date(2019, 12, 18),
                observation_environment: "test",
                examiner_initials: "TT",
                date_of_submission: new Date(2019, 12, 20), 
                total,
                responses,
            };

            const submission = new ABSSubmission(submission_data);
            const saved_submission = await submission.save();

            expect(saved_submission).toEqual(expect.objectContaining({
                ...submission_data,
                responses: expect.arrayContaining(responses)
            }));
        }); 
        it('get a submission', async () => {
            const {response_data, total} = create_response_data();
            const responses = await ABSResponse.insertMany(response_data);
            
            const submission_data = { 
                period_of_observation_to: new Date(2019, 12, 20),
                period_of_observation_from: new Date(2019, 12, 18),
                observation_environment: "test",
                examiner_initials: "TT",
                date_of_submission: new Date(2019, 12, 20), 
                total,
                responses,
            };

            const submission = new ABSSubmission(submission_data);
            const saved_submission = await submission.save();

            const get_submission = await ABSSubmission.findOne({
                _id: saved_submission._id
            });

            expect(get_submission).toEqual(expect.objectContaining({
                ...submission_data,
                responses: expect.arrayContaining(responses.map(({_id}) => _id))
            }));
            expect(responses.map(({_id}) => _id)).toEqual(
                expect.arrayContaining(get_submission.responses));
        }); 
    });
});
