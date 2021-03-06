import { jest } from '@jest/globals';
import axios from 'axios';
import questions from '../../data/abs';
import { AbsService } from '../AbsService';
import { get } from 'lodash';
import { ABSSubmission } from '../../types/ABS';

jest.mock('axios');

describe('Testing AbsService', () => {
  var absService;
  const patientId = 'test-patient-id';
  const latestSubmission = {
    _id: 'submission-2',
    responses: [
      { _id: '1', question_num: 1, score: 4 },
      { _id: '2', question_num: 2, score: 4 },
      { _id: '3', question_num: 3, score: 4 },
      { _id: '4', question_num: 4, score: 4 },
      { _id: '5', question_num: 5, score: 4 },
      { _id: '6', question_num: 6, score: 4 },
      { _id: '7', question_num: 7, score: 4 },
      { _id: '8', question_num: 8, score: 4 },
      { _id: '9', question_num: 9, score: 4 },
      { _id: '10', question_num: 10, score: 4 },
      { _id: '11', question_num: 11, score: 4 },
      { _id: '12', question_num: 12, score: 4 },
      { _id: '13', question_num: 13, score: 4 },
      { _id: '14', question_num: 14, score: 4 },
    ],
    period_of_observation_to: '2021-04-15T012:00:00Z',
    period_of_observation_from: '2021-04-15T04:00:00Z',
    observation_environment: 'bed',
    examiner_initials: 'AB',
    date_of_submission: '2021-04-15T05:00:00Z',
    total: 56,
    patient: patientId,
  };
  const data = [
    {
      _id: 'submission-1',
      responses: [
        { _id: '1', question_num: 1, score: 3 },
        { _id: '2', question_num: 2, score: 2 },
        { _id: '3', question_num: 3, score: 1 },
        { _id: '4', question_num: 4, score: 3 },
        { _id: '5', question_num: 5, score: 2 },
        { _id: '6', question_num: 6, score: 1 },
        { _id: '7', question_num: 7, score: 3 },
        { _id: '8', question_num: 8, score: 2 },
        { _id: '9', question_num: 9, score: 1 },
        { _id: '10', question_num: 10, score: 3 },
        { _id: '11', question_num: 11, score: 2 },
        { _id: '12', question_num: 12, score: 1 },
        { _id: '13', question_num: 13, score: 3 },
        { _id: '14', question_num: 14, score: 2 },
      ],
      period_of_observation_to: '2021-04-14T012:00:00Z',
      period_of_observation_from: '2021-04-14T04:00:00Z',
      observation_environment: 'hospital',
      examiner_initials: 'AA',
      date_of_submission: '2021-04-14T05:00:00Z',
      total: 29,
      patient: patientId,
    },
    latestSubmission,
  ];
  const transformedData = [
    {
      submissionDate: new Date('2021-04-14T05:00:00Z'),
      periodOfObs_to: new Date('2021-04-14T012:00:00Z'),
      periodOfObs_from: new Date('2021-04-14T04:00:00Z'),
      obsEnv: 'hospital',
      examinerInitials: 'AA',
      patientId,
      answers: [
        { questionNum: 1, score: 3 },
        { questionNum: 2, score: 2 },
        { questionNum: 3, score: 1 },
        { questionNum: 4, score: 3 },
        { questionNum: 5, score: 2 },
        { questionNum: 6, score: 1 },
        { questionNum: 7, score: 3 },
        { questionNum: 8, score: 2 },
        { questionNum: 9, score: 1 },
        { questionNum: 10, score: 3 },
        { questionNum: 11, score: 2 },
        { questionNum: 12, score: 1 },
        { questionNum: 13, score: 3 },
        { questionNum: 14, score: 2 },
      ],
      total: 29,
      submissionId: 'submission-1',
    },
    {
      submissionDate: new Date('2021-04-15T05:00:00Z'),
      periodOfObs_to: new Date('2021-04-15T012:00:00Z'),
      periodOfObs_from: new Date('2021-04-15T04:00:00Z'),
      obsEnv: 'bed',
      examinerInitials: 'AB',
      patientId,
      answers: [
        { questionNum: 1, score: 4 },
        { questionNum: 2, score: 4 },
        { questionNum: 3, score: 4 },
        { questionNum: 4, score: 4 },
        { questionNum: 5, score: 4 },
        { questionNum: 6, score: 4 },
        { questionNum: 7, score: 4 },
        { questionNum: 8, score: 4 },
        { questionNum: 9, score: 4 },
        { questionNum: 10, score: 4 },
        { questionNum: 11, score: 4 },
        { questionNum: 12, score: 4 },
        { questionNum: 13, score: 4 },
        { questionNum: 14, score: 4 },
      ],
      total: 56,
      submissionId: 'submission-2',
    },
  ];

  const dataSummary = [
    {
      question:
        'Short attention span, easy distractibility, inability to concentrate',
      '14/4/2021': 3,
      '15/4/2021': 4,
    },
    {
      question: 'Impulsive, impatient, low tolerance for pain or frustration',
      '14/4/2021': 2,
      '15/4/2021': 4,
    },
    {
      question: 'Uncooperative, resistant to care, demanding',
      '14/4/2021': 1,
      '15/4/2021': 4,
    },
    {
      question:
        'Violent and / or threatening violence toward people or property',
      '14/4/2021': 3,
      '15/4/2021': 4,
    },
    {
      question: 'Explosive and / or unpredictable anger',
      '14/4/2021': 2,
      '15/4/2021': 4,
    },
    {
      question: 'Rocking, rubbing, moaning or other self-stimulating behavior',
      '14/4/2021': 1,
      '15/4/2021': 4,
    },
    {
      question: 'Pulling at tubes, restraints, etc.',
      '14/4/2021': 3,
      '15/4/2021': 4,
    },
    {
      question: 'Wandering from treatment areas',
      '14/4/2021': 2,
      '15/4/2021': 4,
    },
    {
      question: 'Restlessness, pacing, excessive movement',
      '14/4/2021': 1,
      '15/4/2021': 4,
    },
    {
      question: 'Repetitive behaviors, motor and / or verbal',
      '14/4/2021': 3,
      '15/4/2021': 4,
    },
    {
      question: 'Rapid, loud or excessive talking',
      '14/4/2021': 2,
      '15/4/2021': 4,
    },
    {
      question: 'Sudden changes of mood',
      '14/4/2021': 1,
      '15/4/2021': 4,
    },
    {
      question: 'Easily initiated or excessive crying and / or laughter',
      '14/4/2021': 3,
      '15/4/2021': 4,
    },
    {
      question: 'Self-abusiveness, physical and / or verbal',
      '14/4/2021': 2,
      '15/4/2021': 4,
    },
    { question: 'Total', '14/4/2021': 29, '15/4/2021': 56 },
  ];

  const newSubmission: ABSSubmission = {
    submissionDate: new Date(),
    periodOfObs_to: new Date(),
    periodOfObs_from: new Date(),
    obsEnv: 'hospital bed',
    examinerInitials: 'AC',
    patientId: patientId,
    answers: [
      { questionNum: 1, score: 1 },
      { questionNum: 2, score: 2 },
    ],
    submissionId: 'submission-3',
    total: 3,
  };

  describe('gets abs submissions for a patient', () => {
    beforeEach(() => {
      axios.get = jest.fn();
      (axios.get as any).mockResolvedValue({ data });
      absService = new AbsService();
    });

    it('retrieves submissions in reverse chronological order', () => {
      expect.assertions(2);
      absService
        .getAbsSubmissions(patientId)
        .subscribe((patientSubmissions) => {
          // Assert reverse chronological oder
          expect(
            patientSubmissions[0].submissionDate.getTime()
          ).toBeGreaterThan(patientSubmissions[1].submissionDate.getTime());
          // Assert return value
          expect(JSON.stringify(patientSubmissions)).toEqual(
            JSON.stringify([...transformedData].reverse())
          );
        });
    });

    it('calls the /api/abs/submissions endpoint', () => {
      expect.assertions(2);
      absService.getAbsSubmissions(patientId).subscribe((_) => {
        expect((axios.get as any).mock.calls.length).toBe(1);
        expect((axios.get as any).mock.calls[0][0]).toBe(
          `/api/abs/submissions/${patientId}`
        );
      });
    });

    it('chaches the list of ABSSubmissions', () => {
      expect.assertions(1);
      absService.getAbsSubmissions(patientId).subscribe((_) => {
        expect(JSON.stringify(absService.submissions[patientId])).toEqual(
          JSON.stringify(transformedData)
        );
      });
    });

    it('uses the cached submissions list', () => {
      expect.assertions(1);
      absService.getAbsSubmissions(patientId).subscribe((_) => {
        absService.getAbsSubmissions(patientId).subscribe(() => {
          expect((axios.get as any).mock.calls.length).toBe(1);
        });
      });
    });
  });

  describe('gets abs summary for a patient', () => {
    beforeEach(() => {
      axios.get = jest.fn();
      (axios.get as any).mockResolvedValue({ data });
      absService = new AbsService();
    });

    it('calls the /api/abs/submissions endpoint', () => {
      expect.assertions(2);
      absService.getAbsSubmissions(patientId).subscribe((_) => {
        expect((axios.get as any).mock.calls.length).toBe(1);
        expect((axios.get as any).mock.calls[0][0]).toBe(
          `/api/abs/submissions/${patientId}`
        );
      });
    });

    it('retrieves a summary of abs submissions', () => {
      expect.assertions(1);
      absService.getAbsSummary(patientId).subscribe((patientSummary) => {
        expect(JSON.stringify(patientSummary)).toEqual(
          JSON.stringify(dataSummary)
        );
      });
    });

    it('caches the list of ABSSubmissions', () => {
      expect.assertions(1);
      absService.getAbsSummary(patientId).subscribe((_) => {
        expect(JSON.stringify(absService.submissions[patientId])).toEqual(
          JSON.stringify(transformedData)
        );
      });
    });

    it('uses the cached submissions list', () => {
      expect.assertions(1);
      absService.getAbsSummary(patientId).subscribe((_) => {
        absService.getAbsSummary(patientId).subscribe(() => {
          expect((axios.get as any).mock.calls.length).toBe(1);
        });
      });
    });
  });

  describe('submits an abs submission', () => {
    beforeEach(() => {
      axios.post = jest.fn();
      (axios.post as any).mockResolvedValue(newSubmission);
      absService = new AbsService();
    });

    it('calls the /api/abs/submit endpoint', () => {
      expect.assertions(3);
      absService.submit(newSubmission).subscribe(() => {
        expect((axios.post as any).mock.calls.length).toBe(1);
        expect((axios.post as any).mock.calls[0][0]).toBe('/api/abs/submit');
        expect((axios.post as any).mock.calls[0][1]).toBe(newSubmission);
      });
    });

    it('clears cached submissions list', () => {
      expect.assertions(1);
      absService.submissions[patientId] = [];
      absService.submit(newSubmission).subscribe(() => {
        expect(absService.submissions[patientId]).toBeNull();
      });
    });
  });

  describe('gets the date of the latest submission', () => {
    beforeEach(() => {
      axios.get = jest.fn();
      (axios.get as any).mockResolvedValue({ data: [latestSubmission] });
      absService = new AbsService();
    });

    it('calls the /api/abs/lastSubmission endpoint', () => {
      expect.assertions(2);
      absService.getLastAbsSubmissionDate(patientId).subscribe((_) => {
        expect((axios.get as any).mock.calls.length).toBe(1);
        expect((axios.get as any).mock.calls[0][0]).toBe(
          `/api/abs/lastSubmission/${patientId}`
        );
      });
    });

    it('retrieves the date of the latest abs submission', () => {
      expect.assertions(1);
      absService.getLastAbsSubmissionDate(patientId).subscribe((date) => {
        expect(date).toEqual(new Date(2021, 3, 15));
      });
    });
  });
});
