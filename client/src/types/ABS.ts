export interface ABSSubmission {
  submissionDate?: Date;
  periodOfObs_to: Date;
  periodOfObs_from: Date;
  obsEnv?: string;
  examinerInitials?: string; //is this needed for ABS??
  patientId: string;
  answers: Array<ABSAnswer>;
  submissionId?: string;
  total?: number;
}

export interface ABSQuestion {
  title: string;
  questionNum: number;
}

export interface ABSAnswer {
  questionNum: number;
  score: number; // 1- 4
}
