import { jest } from '@jest/globals';
import axios from 'axios';
import { PatientService } from '../PatientService';

jest.mock('axios');

describe('Testing PatientService', () => {
  var patientService;
  const patientId = 'test-patient-id';
  const patient = {
    _id: patientId,
    personId: null,
    currentImages: [],
    correctImageAnswersInARow: 0,
    location: null,
    dateOfBirth: null,
  };
  const data = patient;

  describe('Gets a patient by id', () => {
    beforeEach(() => {
      axios.get = jest.fn();
      (axios.get as any).mockResolvedValue({ data });
      patientService = new PatientService();
    });

    it('calls the /api/patient endpoint', () => {
      expect.assertions(2);
      patientService.getPatient(patientId).subscribe((_) => {
        expect((axios.get as any).mock.calls.length).toBe(1);
        expect((axios.get as any).mock.calls[0][0]).toBe(
          `/api/patient/${patientId}`
        );
      });
    });

    it('retrieves the patient document', () => {
      // More of a placeholder unit test
      expect.assertions(1);
      patientService.getPatient(patientId).subscribe((retrievedPatient) => {
        expect(retrievedPatient).toEqual(patient);
      });
    });
  });
});
