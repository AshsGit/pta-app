const request = require('supertest');
const mongoose = require('../../../mongoose_init');
const db_uri = require('../../../config/keys').testMongoURI;
mongoose.connect(db_uri);

const app = require('../../../app');
const { ABSSubmission, ABSResponse } = require('../../../models/ABS');

describe('ABS endpoint tests', () => {
  clearAll = async () =>
    await Promise.all([
      ABSResponse.deleteMany({}),
      ABSSubmission.deleteMany({}),
    ]);

  beforeAll(async () => {
    await clearAll();
  });
  afterEach(async () => {
    await clearAll();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('ABS post request endpoints', () => {
    it('post a submission via: /api/abs/submit', async (done) => {
      const answers = [...Array(14).keys()].map((key) => ({
        questionNum: key + 1,
        score: (key + 1) % 4,
      }));
      const total = answers.reduce((cur, answer) => cur + answer.score, 0);

      const submission_data = {
        submissionDate: new Date(2019, 12, 20),
        periodOfObs_to: new Date(2019, 12, 20),
        periodOfObs_from: new Date(2019, 12, 18),
        obsEnv: 'test env',
        examinerInitials: 'TT',
        patientId: 'test-patient',
        answers,
        total,
      };

      await request(app)
        .post(`/api/abs/submit`, submission_data)
        .send(submission_data)
        .expect(200)
        .catch(done.fail)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              observation_environment: 'test env',
              examiner_initials: 'TT',
              total,
            })
          );
          expect(new Date(response.body.date_of_submission).getDay()).toBe(
            new Date().getDay()
          );
          expect(response.body.period_of_observation_from.toString()).toMatch(
            '2020-01-17T14:00:00.000Z'
          );
          expect(response.body.period_of_observation_to.toString()).toMatch(
            '2020-01-19T14:00:00.000Z'
          );
          expect(response.body.responses.length).toBe(14);
        });

      done();
    });
  });

  describe('ABS get request endpoints', () => {
    it('get a single submission via: /api/abs/lastSubmission/:patientId', async (done) => {
      const answers = [...Array(14).keys()].map((key) => ({
        questionNum: key + 1,
        score: (key + 1) % 4,
      }));
      const total = answers.reduce((cur, answer) => cur + answer.score, 0);

      const submission_data = {
        submissionDate: new Date(2019, 12, 20),
        periodOfObs_to: new Date(2019, 12, 20, 0, 0),
        periodOfObs_from: new Date(2019, 12, 18, 0, 0),
        obsEnv: 'test env',
        examinerInitials: 'TT',
        patientId: 'test-patient',
        answers,
        total,
      };

      await request(app)
        .post(`/api/abs/submit`, submission_data)
        .send(submission_data)
        .expect(200)
        .catch(done.fail)
        .then(async (response) => {
          await request(app)
            .get(`/api/abs/lastSubmission/${response.body.patient}`)
            .expect(200)
            .then((response2) => {
              expect(response2.body.length).toBe(1); //list of 1 submission should be returned
              const submission = response2.body[0];
              expect(submission).toEqual(
                expect.objectContaining({
                  _id: response.body._id,
                  observation_environment: 'test env',
                  examiner_initials: 'TT',
                  total,
                  responses: expect.arrayContaining(response.body.responses),
                })
              );
              expect(new Date(submission.date_of_submission).getDay()).toBe(
                new Date().getDay()
              );
              expect(submission.period_of_observation_from.toString()).toMatch(
                '2020-01-17T14:00:00.000Z'
              );
              expect(submission.period_of_observation_to.toString()).toMatch(
                '2020-01-19T14:00:00.000Z'
              );
              expect(submission.responses.length).toBe(14);
            });
        });

      done();
    });
    it('get a single submission via: /api/abs/submission/:submissionId', async (done) => {
      const answers = [...Array(14).keys()].map((key) => ({
        questionNum: key + 1,
        score: (key + 1) % 4,
      }));
      const total = answers.reduce((cur, answer) => cur + answer.score, 0);

      const submission_data = {
        submissionDate: new Date(2019, 12, 20),
        periodOfObs_to: new Date(2019, 12, 20),
        periodOfObs_from: new Date(2019, 12, 18),
        obsEnv: 'test env',
        examinerInitials: 'TT',
        patientId: 'test-patient',
        answers,
        total,
      };

      await request(app)
        .post(`/api/abs/submit`, submission_data)
        .send(submission_data)
        .expect(200)
        .catch(done.fail)
        .then(async (response) => {
          await request(app)
            .get(`/api/abs/submission/${response.body._id}`)
            .expect(200)
            .then((response2) => {
              const submission = response2.body;
              expect(submission).toEqual(
                expect.objectContaining({
                  _id: response.body._id,
                  observation_environment: 'test env',
                  examiner_initials: 'TT',
                  total,
                })
              );
              expect(new Date(submission.date_of_submission).getDay()).toBe(
                new Date().getDay()
              );
              expect(submission.period_of_observation_from.toString()).toMatch(
                '2020-01-17T14:00:00.000Z'
              );
              expect(submission.period_of_observation_to.toString()).toMatch(
                '2020-01-19T14:00:00.000Z'
              );
              expect(submission.responses.length).toBe(14);
              expect(submission.responses.map(({ _id }) => _id)).toEqual(
                expect.arrayContaining(response.body.responses)
              );
            });
        });

      done();
    });

    it('get all patient submissions via: /api/abs/submissions/:patientId', async (done) => {
      const answers = (shift) =>
        [...Array(14).keys()].map((key) => ({
          questionNum: key + 1,
          score: (key + 1 + shift) % 4,
        }));
      const total = (answers) =>
        answers.reduce((cur, answer) => cur + answer.score, 0);

      const submission_data = [...Array(3).keys()].map((shift) => ({
        submissionDate: new Date(2019, 12, 20 + shift),
        periodOfObs_to: new Date(2019, 12, 20 + shift),
        periodOfObs_from: new Date(2019, 12, 18),
        obsEnv: `test env ${shift}`,
        examinerInitials: `T${shift}`,
        patientId: 'test-patient',
        answers: answers(shift),
        total: total(answers(shift)),
      }));

      const submit_responses = [];

      await Promise.all(
        submission_data.map(
          async (submission) =>
            await request(app)
              .post(`/api/abs/submit`, submission)
              .send(submission)
              .expect(200)
              .catch(done.fail)
              .then((res) => submit_responses.push(res.body))
        )
      );

      await request(app)
        .get(`/api/abs/submissions/${submit_responses[0].patient}`)
        .expect(200)
        .catch(done.fail)
        .then((response) => {
          const submissions = response.body;
          expect(submissions.length).toBe(3);
          expect(submissions).toEqual(
            expect.arrayContaining(
              submit_responses.map(
                ({ _id, observation_environment, examiner_initials, total }) =>
                  expect.objectContaining({
                    _id,
                    observation_environment,
                    examiner_initials,
                    total,
                  })
              )
            )
          );
          submissions.forEach((submission) => {
            expect(new Date(submission.date_of_submission).getDay()).toBe(
              new Date().getDay()
            );
            expect(submission.responses.length).toBe(14);
            expect(
              submit_responses.map(({ responses }) => responses)
            ).toContainEqual(submission.responses.map(({ _id }) => _id));
          });
        });

      done();
    });
  });
});
