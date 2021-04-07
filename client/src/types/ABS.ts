export interface ABSSubmission {
  periodOfObs_to: Date;
  periodOfObs_from: Date;
  obsEnv: string;
  //examinerInitials: string, //is this needed for ABS
  answers: Array<ABSAnswer>;
  patientId: string;
  submissionId: string;
}

export interface ABSQuestion {
  title: string;
  questionNum: number;
}

export interface ABSAnswer {
  questionNum: number;
  score: number; // 1- 4
}
