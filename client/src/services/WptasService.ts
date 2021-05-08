import { WPTASSubmission } from "../types/WPTAS"
import axios from 'axios';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { questions } from '../data/wptas_questions';

type PatientWptasSummary = Array<
  { question: string } & {
    [column: string]: number; // column is either 'question' or a date string.
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
    /*getWPTASSummary(patientId: string): Observable<PatientWptasSummary>;
    
    getWPTASSubmissions(patientId: string): Observable<Array<WPTASSubmission>> {
        if (this.submissions[patientId]) {
            return of(this.submissions[patientId]);
          }
          return from(axios.get(`/api/abs/submissions/${patientId}`)).pipe(
            // Reverse because we display history in reverse chronological order
            map((result) => result.data),
            map(this.dbWptasSubmissionsToAbsSubmissions),
            // Cache submissions
            tap((submissions) => (this.submissions[patientId] = [...submissions])),
            map((submissions) => submissions.reverse())
          );
    }
    getWPTASSubmission(submissionId: string): Observable<any> {
        return from(axios.get(`/api/wptas/submission/${submissionId}`));
    }*/

}