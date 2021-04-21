import { jest } from '@jest/globals';
import axios from 'axios';
import { AbsService } from '../src/services/AbsService';
// const axios = require('axios');
// const { AbsService } = require('../src/services/AbsService');
// const axios = require('axios');

jest.mock('axios');

describe('Testing AbsService', () => {
  const absService = new AbsService();
  const patientId = '606d355d91243a6680a59269';
  const data = [
    {
      _id: '607686cd192e4d55047e48b6',
      responses: [
        { _id: '607686cd192e4d55047e48a8', question_num: 1, score: 3 },
        { _id: '607686cd192e4d55047e48a9', question_num: 2, score: 2 },
        { _id: '607686cd192e4d55047e48aa', question_num: 3, score: 1 },
      ],
      period_of_observation_to: '2021-04-14T012:00:00Z',
      period_of_observation_from: '2021-04-14T04:00:00Z',
      observation_environment: 'hospital',
      examiner_initials: '',
      date_of_submission: '2021-04-14T05:00:00Z',
      total: 6,
      patient: patientId,
    },
    {
      _id: '607686cd192e4d55047e48b7',
      responses: [
        { _id: '607686cd192e4d55047e48ab', question_num: 1, score: 4 },
        { _id: '607686cd192e4d55047e48ac', question_num: 2, score: 4 },
        { _id: '607686cd192e4d55047e48ad', question_num: 3, score: 4 },
      ],
      period_of_observation_to: '2021-04-15T012:00:00Z',
      period_of_observation_from: '2021-04-15T04:00:00Z',
      observation_environment: 'bed',
      examiner_initials: '',
      date_of_submission: '2021-04-15T05:00:00Z',
      total: 12,
      patient: '606d355d91243a6680a59269',
    },
  ];
  const transformedData = [
    {
      submissionDate: new Date('2021-04-14T05:00:00Z'),
      periodOfObs_to: new Date('2021-04-14T012:00:00Z'),
      periodOfObs_from: new Date('2021-04-14T04:00:00Z'),
      obsEnv: 'hospital',
      examinerInitials: '',
      patientId,
      answers: [
        { questionNum: 1, score: 3 },
        { questionNum: 2, score: 2 },
        { questionNum: 3, score: 1 },
      ],
      total: 6,
      submissionId: '607686cd192e4d55047e48b6',
    },
    {
      submissionDate: new Date('2021-04-15T05:00:00Z'),
      periodOfObs_to: new Date('2021-04-15T012:00:00Z'),
      periodOfObs_from: new Date('2021-04-15T04:00:00Z'),
      obsEnv: 'bed',
      examinerInitials: '',
      patientId,
      answers: [
        { questionNum: 1, score: 4 },
        { questionNum: 2, score: 4 },
        { questionNum: 3, score: 4 },
      ],
      total: 12,
      submissionId: '607686cd192e4d55047e48b7',
    },
  ];

  beforeAll(() => {
    axios.get = jest.fn();
    // axios.get.mockResolvedValue({ data });
    (axios.get as any).mockResolvedValue({ data });
  });

  describe('gets abs submissions for a patient', () => {
    it('retrieves submissions in reverse chronological order', async () => {
      expect.assertions(1);
      return absService
        .getAbsSubmissions(patientId)
        .subscribe((patientSubmissions) => {
          console.log('Patientsubmissions', patientSubmissions);
          expect(
            patientSubmissions[0].submissionDate.getTime()
          ).toBeGreaterThan(patientSubmissions[1].submissionDate.getTime());
        });
    });
    it('stores a list of ABSSubmissions', () => {
      // Workaround for object equality checking
      expect(JSON.stringify(absService.submissions)).toEqual(
        JSON.stringify(transformedData)
      );
    });
  });
  // it('retrieves a summary of abs submissions' () => {

  // })
});
