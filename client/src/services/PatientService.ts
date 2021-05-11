import axios from 'axios';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { get } from 'lodash';
import { Patient } from '../types/Patient';

export class PatientService {
  getPatient(patientId: string): Observable<Patient> {
    return from(axios.get(`/api/patient/${patientId}`)).pipe(
      catchError((err) => of(null)),
      map((result) => {
        return get(result, 'data');
      })
    );
  }
}
