import { WPTASSubmission } from '../types/WPTAS';
import axios from 'axios';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { questions, questionTitles } from '../data/wptas_questions';

type PatientWptasSummary = Array<
  { question: string } & {
    [column: string]: string; // column is either 'question' or a date string.
  }
>;

export class WptasService {
  submissions: { [patientId: string]: Array<WPTASSubmission> } = {};
  submit(submission: WPTASSubmission): Observable<any> {
    this.submissions[submission.patientId] = null;
    return from(
      axios.post('/api/wptas/submit', submission, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    );
  }

  getWptasSummary(patientId: string): Observable<PatientWptasSummary> {
    return (this.submissions[patientId]
      ? of(this.submissions[patientId])
      : from(axios.get(`/api/wptas/submissions/${patientId}`)).pipe(
          map((result) => result.data),
          map(this.dbWptasSubmissionsToWptasSubmissions),
          // Cache submissions
          tap((submissions) => (this.submissions[patientId] = submissions))
        )
    ).pipe(
      map((submissions: Array<WPTASSubmission>) => {
        let rows = questionTitles.map((title) => ({
          question: title,
        }));
        let totalRow = { question: 'Total' };
        rows.push(totalRow);
        submissions.forEach((submission) => {
          let date = new Date(submission.submissionDate);
          let formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
          submission.answers.forEach(
            ({ questionNum, score, multiChoiceGiven }) => {
              // TODO add multiple choice
              rows[questionNum - 1][formattedDate] = `${score}${
                multiChoiceGiven ? '*' : ''
              }`;
              totalRow[formattedDate] = (totalRow[formattedDate] || 0) + score;
            }
          );
        });
        return rows as PatientWptasSummary;
      })
    );
  }

  getWptasSubmissions(patientId: string): Observable<Array<WPTASSubmission>> {
    if (this.submissions[patientId]) {
      return of(this.submissions[patientId]);
    }
    return from(axios.get(`/api/wptas/submissions/${patientId}`)).pipe(
      map((result) => result.data),
      map(this.dbWptasSubmissionsToWptasSubmissions),
      // Cache submissions
      tap((submissions) => (this.submissions[patientId] = [...submissions])),
      // Reverse because we display history in reverse chronological order
      map((submissions) => submissions.reverse())
    );
  }

  // getWPTASSubmission(submissionId: string): Observable<any> {
  //   return from(axios.get(`/api/wptas/submission/${submissionId}`));
  // }

  private dbWptasSubmissionsToWptasSubmissions = (
    submissions
  ): Array<WPTASSubmission> => {
    if (!submissions) return null;

    const dbWptasSubmissionToWptasSubmission = ({
      date_of_submission,
      examiner_initials,
      patient,
      responses,
      total,
      _id,
    }): WPTASSubmission => {
      return {
        submissionDate: new Date(date_of_submission),
        examinerInitials: examiner_initials,
        patientId: patient,
        answers: responses.map(
          ({ question_num, score, multiple_choice_given }) => ({
            questionNum: question_num,
            multiChoiceGiven: multiple_choice_given,
            score,
          })
        ),
        total,
        submissionId: _id,
      };
    };

    return submissions.map(dbWptasSubmissionToWptasSubmission);
  };
}
