import { WPTASSubmission } from '../types/WPTAS';
import axios from 'axios';
import { from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { questionTitles } from '../data/wptas_questions';
import { get } from 'lodash';

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
              totalRow[formattedDate] = (
                parseInt(totalRow[formattedDate] || '0') + score
              ).toString();
            }
          );
        });
        return rows as PatientWptasSummary;
      })
    );
  }

  /**
   * Get all WPTAS test submissions completed by the given patient.
   * @param patientId: The ID of a patient within the database.
   * @returns Observable array of all WPTAS test submissions completed by the given patient.
  */
  getWptasSubmissions(patientId: string): Observable<Array<WPTASSubmission>> {
    //Check if the submissions from the given patient are already cached.
    if (this.submissions[patientId]) {
      /* Return the cached patient submissions as an Observable.
         We return it as an Observable as components calling this service are expecting
         it to contact the server asynchronously and return the request as an observable. 
         The `submissions` cache is an implementation detail which we hide by always 
         returning an Observable. */
      return of(this.submissions[patientId]);
    }
    /* Asynchronously request the patient's submissions from the server via the server API
       and return the result as an Observable. */
    return from(axios.get(`/api/wptas/submissions/${patientId}`)).pipe(
      //get data from axios response
      map((result) => result.data),
      //convert database WPTAS submission type to client WPTASSubmission type
      map(this.dbWptasSubmissionsToWptasSubmissions),
      // Cache submissions
      tap((submissions) => (this.submissions[patientId] = [...submissions])),
      // Reverse because we display history in reverse chronological order
      map((submissions) => submissions.reverse())
    );
  }

  getLastWptasSubmissionDate(patientId: string): Observable<Date> {
    return from(axios.get(`/api/wptas/lastSubmission/${patientId}`)).pipe(
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
