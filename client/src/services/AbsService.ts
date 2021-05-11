// import Axios from 'axios-observable';
import axios from 'axios';
import { from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import questions from '../data/abs';
import { get } from 'lodash';
import { ABSSubmission } from '../types/ABS';

type PatientAbsSummary = Array<
  { question: string } & {
    [column: string]: number; // column is either 'question' or a date string.
  }
>;

export class AbsService {
  submissions: { [patientId: string]: Array<ABSSubmission> } = {};

  private dbAbsSubmissionsToAbsSubmissions = (
    submissions
  ): Array<ABSSubmission> => {
    if (!submissions) return null;

    const dbAbsSubmissionToAbsSubmission = ({
      date_of_submission,
      examiner_initials,
      observation_environment,
      patient,
      period_of_observation_from,
      period_of_observation_to,
      responses,
      total,
      _id,
    }): ABSSubmission => {
      return {
        submissionDate: new Date(date_of_submission),
        periodOfObs_to: new Date(period_of_observation_to),
        periodOfObs_from: new Date(period_of_observation_from),
        obsEnv: observation_environment,
        examinerInitials: examiner_initials,
        patientId: patient,
        answers: responses.map(({ question_num, score }) => ({
          questionNum: question_num,
          score,
        })),
        total,
        submissionId: _id,
      };
    };

    return submissions.map(dbAbsSubmissionToAbsSubmission);
  };

  submit(submission: ABSSubmission): Observable<any> {
    this.submissions[submission.patientId] = null;
    return from(
      axios.post('/api/abs/submit', submission, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    );
  }

  getAbsSummary(patientId: string): Observable<PatientAbsSummary> {
    return (this.submissions[patientId]
      ? of(this.submissions[patientId])
      : from(axios.get(`/api/abs/submissions/${patientId}`)).pipe(
          map((result) => result.data),
          map(this.dbAbsSubmissionsToAbsSubmissions),
          // Cache submissions
          tap((submissions) => (this.submissions[patientId] = submissions))
        )
    ).pipe(
      map((submissions: Array<ABSSubmission>) => {
        let rows = questions.map((question) => ({
          question: question.title,
        }));
        let totalRow = { question: 'Total' };
        rows.push(totalRow);
        submissions.forEach((submission) => {
          let date = new Date(submission.submissionDate);
          let formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
          submission.answers.forEach(({ questionNum, score }) => {
            rows[questionNum - 1][formattedDate] = score;
            totalRow[formattedDate] = (totalRow[formattedDate] || 0) + score;
          });
        });
        return rows as PatientAbsSummary;
      })
    );
  }

  getAbsSubmissions(patientId: string): Observable<Array<ABSSubmission>> {
    if (this.submissions[patientId]) {
      return of(this.submissions[patientId]);
    }
    return from(axios.get(`/api/abs/submissions/${patientId}`)).pipe(
      map((result) => result.data),
      map(this.dbAbsSubmissionsToAbsSubmissions),
      // Cache submissions
      tap((submissions) => (this.submissions[patientId] = [...submissions])),
      // Reverse because we display history in reverse chronological order
      map((submissions) => submissions.reverse())
    );
  }

  getLastAbsSubmissionDate(patientId: string): Observable<Date> {
    return from(axios.get(`/api/abs/lastSubmission/${patientId}`)).pipe(
      catchError((err) => of(null)),
      map((result) => {
        let submissionDate = get(result, ['data', 0, 'date_of_submission']);
        if (!submissionDate) {
          return null;
        }
        let date = new Date(submissionDate);
        date.setHours(0, 0, 0, 0);
        return date;
      })
    );
  }

  // getAbsSubmission(submissionId: string): Observable<Array<ABSSubmission>> {
  getAbsSubmission(submissionId: string): Observable<any> {
    return from(axios.get(`/api/abs/submission/${submissionId}`));
  }
}
