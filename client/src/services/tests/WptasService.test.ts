import { jest } from '@jest/globals';
import axios from 'axios';
import { questionTitles } from '../../data/wptas_questions';
import { WptasService } from '../WptasService';
import { get } from 'lodash';
import { WPTASSubmission } from '../../types/WPTAS';

jest.mock('axios');

describe('Testing WptasService', () => {
  var wptasService;
  const patientId = 'test-patient-id';
  const data = [
    {
      _id: 'submission-1',
      patient: patientId,
      examiner_initials: 'AA',
      responses: [
        { _id: '1', question_num: 1, multiple_choice_given: true, score: 0 },
        { _id: '2', question_num: 2, multiple_choice_given: false, score: 1 },
        { _id: '3', question_num: 3, multiple_choice_given: false, score: 0 },
        { _id: '4', question_num: 4, multiple_choice_given: true, score: 1 },
        { _id: '5', question_num: 5, multiple_choice_given: true, score: 0 },
        { _id: '6', question_num: 6, multiple_choice_given: false, score: 1 },
        { _id: '7', question_num: 7, multiple_choice_given: false, score: 0 },
        { _id: '8', question_num: 8, multiple_choice_given: true, score: 1 },
        { _id: '9', question_num: 9, multiple_choice_given: true, score: 1 },
        { _id: '10', question_num: 10, multiple_choice_given: false, score: 1 },
        { _id: '11', question_num: 11, multiple_choice_given: false, score: 1 },
        { _id: '12', question_num: 12, multiple_choice_given: false, score: 0 },
      ],
      date_of_submission: '2021-04-14T05:00:00Z',
      total: 7,
    },
    {
      _id: 'submission-2',
      patient: patientId,
      examiner_initials: 'AB',
      responses: [
        { _id: '1', question_num: 1, multiple_choice_given: false, score: 1 },
        { _id: '2', question_num: 2, multiple_choice_given: false, score: 1 },
        { _id: '3', question_num: 3, multiple_choice_given: false, score: 1 },
        { _id: '4', question_num: 4, multiple_choice_given: false, score: 1 },
        { _id: '5', question_num: 5, multiple_choice_given: false, score: 1 },
        { _id: '6', question_num: 6, multiple_choice_given: false, score: 1 },
        { _id: '7', question_num: 7, multiple_choice_given: false, score: 1 },
        { _id: '8', question_num: 8, multiple_choice_given: false, score: 1 },
        { _id: '9', question_num: 9, multiple_choice_given: false, score: 1 },
        { _id: '10', question_num: 10, multiple_choice_given: false, score: 1 },
        { _id: '11', question_num: 11, multiple_choice_given: false, score: 1 },
        { _id: '12', question_num: 12, multiple_choice_given: false, score: 1 },
      ],
      date_of_submission: '2021-04-15T05:00:00Z',
      total: 12,
    },
  ];
  const transformedData = [
    {
      submissionDate: new Date('2021-04-14T05:00:00Z'),
      examinerInitials: 'AA',
      patientId,
      answers: [
        { questionNum: 1, multiChoiceGiven: true, score: 0 },
        { questionNum: 2, multiChoiceGiven: false, score: 1 },
        { questionNum: 3, multiChoiceGiven: false, score: 0 },
        { questionNum: 4, multiChoiceGiven: true, score: 1 },
        { questionNum: 5, multiChoiceGiven: true, score: 0 },
        { questionNum: 6, multiChoiceGiven: false, score: 1 },
        { questionNum: 7, multiChoiceGiven: false, score: 0 },
        { questionNum: 8, multiChoiceGiven: true, score: 1 },
        { questionNum: 9, multiChoiceGiven: true, score: 1 },
        { questionNum: 10, multiChoiceGiven: false, score: 1 },
        { questionNum: 11, multiChoiceGiven: false, score: 1 },
        { questionNum: 12, multiChoiceGiven: false, score: 0 },
      ],
      total: 7,
      submissionId: 'submission-1',
    },
    {
      submissionDate: new Date('2021-04-15T05:00:00Z'),
      examinerInitials: 'AB',
      patientId,
      answers: [
        { questionNum: 1, multiChoiceGiven: false, score: 1 },
        { questionNum: 2, multiChoiceGiven: false, score: 1 },
        { questionNum: 3, multiChoiceGiven: false, score: 1 },
        { questionNum: 4, multiChoiceGiven: false, score: 1 },
        { questionNum: 5, multiChoiceGiven: false, score: 1 },
        { questionNum: 6, multiChoiceGiven: false, score: 1 },
        { questionNum: 7, multiChoiceGiven: false, score: 1 },
        { questionNum: 8, multiChoiceGiven: false, score: 1 },
        { questionNum: 9, multiChoiceGiven: false, score: 1 },
        { questionNum: 10, multiChoiceGiven: false, score: 1 },
        { questionNum: 11, multiChoiceGiven: false, score: 1 },
        { questionNum: 12, multiChoiceGiven: false, score: 1 },
      ],
      total: 12,
      submissionId: 'submission-2',
    },
  ];

  const dataSummary = [
    {
      question: 'How old are you?',
      '14/4/2021': '0*',
      '15/4/2021': '1',
    },
    {
      question: 'What is your date of birth?',
      '14/4/2021': '1',
      '15/4/2021': '1',
    },
    {
      question: 'What month are we in?',
      '14/4/2021': '0',
      '15/4/2021': '1',
    },
    {
      question: 'What time of day is it?',
      '14/4/2021': '1*',
      '15/4/2021': '1',
    },
    {
      question: 'What day of the week is it?',
      '14/4/2021': '0*',
      '15/4/2021': '1',
    },
    {
      question: 'What year are we in?',
      '14/4/2021': '1',
      '15/4/2021': '1',
    },
    {
      question: 'What is the name of this place?',
      '14/4/2021': '0',
      '15/4/2021': '1',
    },
    { question: 'Face', '14/4/2021': '1*', '15/4/2021': '1' },
    { question: 'Name', '14/4/2021': '1*', '15/4/2021': '1' },
    { question: 'Picutre I', '14/4/2021': '1', '15/4/2021': '1' },
    { question: 'Picutre II', '14/4/2021': '1', '15/4/2021': '1' },
    { question: 'Picutre III', '14/4/2021': '0', '15/4/2021': '1' },
    { question: 'Total', '14/4/2021': '7', '15/4/2021': '12' },
  ];

  const newSubmission: WPTASSubmission = {
    submissionDate: new Date(),
    examinerInitials: 'AC',
    patientId: patientId,
    answers: [
      { questionNum: 1, multiChoiceGiven: true, score: 0 },
      { questionNum: 2, multiChoiceGiven: true, score: 0 },
      { questionNum: 3, multiChoiceGiven: true, score: 0 },
      { questionNum: 4, multiChoiceGiven: true, score: 0 },
      { questionNum: 5, multiChoiceGiven: true, score: 0 },
      { questionNum: 6, multiChoiceGiven: true, score: 0 },
      { questionNum: 7, multiChoiceGiven: true, score: 0 },
      { questionNum: 8, multiChoiceGiven: true, score: 0 },
      { questionNum: 9, multiChoiceGiven: true, score: 0 },
      { questionNum: 10, multiChoiceGiven: true, score: 0 },
      { questionNum: 11, multiChoiceGiven: true, score: 0 },
      { questionNum: 12, multiChoiceGiven: true, score: 0 },
    ],
    submissionId: 'submission-3',
    total: 0,
  };

  describe('gets wptas submissions for a patient', () => {
    beforeEach(() => {
      axios.get = jest.fn();
      (axios.get as any).mockResolvedValue({ data });
      wptasService = new WptasService();
    });

    it('retrieves submissions in reverse chronological order', () => {
      expect.assertions(2);
      wptasService
        .getWptasSubmissions(patientId)
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

    it('calls the /api/wptas/submissions endpoint', () => {
      expect.assertions(2);
      wptasService.getWptasSubmissions(patientId).subscribe((_) => {
        expect((axios.get as any).mock.calls.length).toBe(1);
        expect((axios.get as any).mock.calls[0][0]).toBe(
          `/api/wptas/submissions/${patientId}`
        );
      });
    });

    it('chaches the list of WPTASSubmissions', () => {
      expect.assertions(1);
      wptasService.getWptasSubmissions(patientId).subscribe((_) => {
        expect(JSON.stringify(wptasService.submissions[patientId])).toEqual(
          JSON.stringify(transformedData)
        );
      });
    });

    it('uses the cached submissions list', () => {
      expect.assertions(1);
      wptasService.getWptasSubmissions(patientId).subscribe((_) => {
        wptasService.getWptasSubmissions(patientId).subscribe(() => {
          expect((axios.get as any).mock.calls.length).toBe(1);
        });
      });
    });
  });

  describe('gets wptas summary for a patient', () => {
    beforeEach(() => {
      axios.get = jest.fn();
      (axios.get as any).mockResolvedValue({ data });
      wptasService = new WptasService();
    });

    it('calls the /api/wptas/submissions endpoint', () => {
      expect.assertions(2);
      wptasService.getWptasSubmissions(patientId).subscribe((_) => {
        expect((axios.get as any).mock.calls.length).toBe(1);
        expect((axios.get as any).mock.calls[0][0]).toBe(
          `/api/wptas/submissions/${patientId}`
        );
      });
    });

    it('retrieves a summary of wptas submissions', () => {
      expect.assertions(1);
      wptasService.getWptasSummary(patientId).subscribe((patientSummary) => {
        expect(JSON.stringify(patientSummary)).toEqual(
          JSON.stringify(dataSummary)
        );
      });
    });

    it('caches the list of WPTASSubmissions', () => {
      expect.assertions(1);
      wptasService.getWptasSummary(patientId).subscribe((_) => {
        expect(JSON.stringify(wptasService.submissions[patientId])).toEqual(
          JSON.stringify(transformedData)
        );
      });
    });

    it('uses the cached submissions list', () => {
      expect.assertions(1);
      wptasService.getWptasSummary(patientId).subscribe((_) => {
        wptasService.getWptasSummary(patientId).subscribe(() => {
          expect((axios.get as any).mock.calls.length).toBe(1);
        });
      });
    });
  });

  describe('submits an wptas submission', () => {
    beforeEach(() => {
      axios.post = jest.fn();
      (axios.post as any).mockResolvedValue(newSubmission);
      wptasService = new WptasService();
    });

    it('calls the /api/wptas/submit endpoint', () => {
      expect.assertions(3);
      wptasService.submit(newSubmission).subscribe(() => {
        expect((axios.post as any).mock.calls.length).toBe(1);
        expect((axios.post as any).mock.calls[0][0]).toBe('/api/wptas/submit');
        expect((axios.post as any).mock.calls[0][1]).toBe(newSubmission);
      });
    });

    it('clears cached submissions list', () => {
      expect.assertions(1);
      wptasService.submissions[patientId] = [];
      wptasService.submit(newSubmission).subscribe(() => {
        expect(wptasService.submissions[patientId]).toBeNull();
      });
    });
  });
});
