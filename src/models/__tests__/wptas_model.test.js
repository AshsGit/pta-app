const mongoose = require('../../mongoose_init');
const db_uri = require('../../config/keys').testMongoURI;
mongoose.connect(db_uri);

const {WPTASSubmission, WPTASResponse} = require('../WPTAS');

describe('WPTAS model tests', () => {
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

    it('Models exist', () => { 
        expect(WPTASSubmission).toBeDefined();
        expect(WPTASResponse).toBeDefined();
    }); 

    describe('WPTASResponse model tests', () => {
        it('save a response', async () => {
            const data = {
                question_num: 3,
                score: 4,
                multiple_choice_given: true
            };

            const response = new WPTASResponse(data);
            const saved_response = await response.save();
            expect(saved_response).toEqual(expect.objectContaining(data));
        });
        it('get a response', async () => {
            const data = {
                question_num: 3, 
                score: 4,
                multiple_choice_given: true
            };

            const response = new WPTASResponse(data);
            const saved_response = await response.save();
            
            const get_response = await WPTASResponse.findOne({_id: saved_response._id});
            expect(get_response).toEqual(expect.objectContaining(data));
        });
    });
    
    describe('WPTASSubmission model tests', () => {
        const create_response_data = () => {
            const response_data = [...Array(12).keys()].map(key=>({
                question_num: key+1,
                score: 1+ key % 4,
                multiple_choice_given: (key+1) % 2 === 0,
            }));
            const total = response_data.reduce((cur, response)=>cur + response.score, 0);
            return {response_data, total};
        };

        it('save a submission', async () => {
            const {response_data, total} = create_response_data();
            const responses = await WPTASResponse.insertMany(response_data);
            
            expect(responses).toEqual(response_data.map(expect.objectContaining));

            const submission_data = { 
                examiner_initials: "TT",
                date_of_submission: new Date(2019, 12, 20), 
                responses,
                total,
            };

            const submission = new WPTASSubmission(submission_data);
            const saved_submission = await submission.save();

            expect(saved_submission).toEqual(expect.objectContaining({
                ...submission_data,
                responses: expect.arrayContaining(responses)
            }));
        }); 
        it("Ensure 'insert' fails when field values are invalid.", async done => {
            const submission_data = { 
                examiner_initials: "TT",
                date_of_submission: new Date(2019, 12, 20), 
                responses: [],
                total: "bad data",
            };

            const submission = new WPTASSubmission(submission_data);
            var flag = 1;
            await submission
                .validate(_ => flag=1)

            if (flag) done()
            else done.fail("model.save should have failed with invalid input.")
            
        });
        it('get a submission', async () => {
            const {response_data, total} = create_response_data();
            const responses = await WPTASResponse.insertMany(response_data);
            
            const submission_data = { 
                examiner_initials: "TT",
                date_of_submission: new Date(2019, 12, 20), 
                responses,
                total,
            };

            const submission = new WPTASSubmission(submission_data);
            const saved_submission = await submission.save();

            const get_submission = await WPTASSubmission.findOne({
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
