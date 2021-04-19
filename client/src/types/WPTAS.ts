export interface WPTASSubmission {
  periodOfObs_to: Date;
  periodOfObs_from: Date;
  obsEnv: string;
  //examinerInitials: string, //is this needed for ABS
  answers: Array<WPTASAnswer>;
  patientId: string;
  submissionId: string;
}

export interface WPTASNonImageQuestion {
  title: string;
  questionNum: number;
  questionType: 'date' | 'select' | 'text';
  choices?: Array<string>;
  multichoiceGenerator?: any;
  correctAnswerGenerator?:any;
}

export interface WPTASImageQuestion {
  title: string;
  questionNum: number;
  questionType: 'image';
  image_names: string[]; //there must be exactly enough images to fill dimensions
  dimensions: '1x3' | '3x3';
  correctAnswerGenerator?: any;
}

export type WPTASQuestion = WPTASNonImageQuestion | WPTASImageQuestion;
export interface WPTASAnswer {
  questionNum: number;
  score: number; // 0 - 1
  answer?: string | Date; // bother with the date type?
  isMultipleChoice: boolean;
}
