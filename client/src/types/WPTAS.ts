export interface WPTASSubmission {
  periodOfObs_to: Date;
  periodOfObs_from: Date;
  obsEnv: string;
  //examinerInitials: string, //is this needed for ABS
  answers: Array<WPTASAnswer>;
  patientId: string;
  submissionId: string;
}

export interface WPTASQuestion {
  title: string;
  questionNum: number;
  questionType: WPTASQuestionType;
  choices?: Array<string>;
}

export enum WPTASQuestionType {
  date = 'date',
  select = 'select',
  text = 'text',
}

export interface WPTASAnswer {
  questionNum: number;
  score: number; // 0 - 1
  answer?: string | Date; // bother with the date type?
  isMultipleChoice: boolean;
}
