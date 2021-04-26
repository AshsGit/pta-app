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
  correctAnswerGenerator?: any; //change any type to () => Promise<string>
}

export interface WPTASFaceQuestion {
  title: string;
  questionNum: number;
  questionType: 'face_question';
  image_names: string[]; //there must be exactly enough images to fill dimensions
  correctAnswerGenerator?: any; //change any type to () => Promise<string>
}

export interface WPTASPicturesQuestion {
  title: string;
  questionNum: number[];
  questionType: 'pictures_question';
  image_names: string[]; //there must be exactly enough images to fill dimensions
  correctAnswerGenerator?: () => string[];
}

export type WPTASQuestion = WPTASNonImageQuestion | WPTASFaceQuestion | WPTASPicturesQuestion;
export interface WPTASAnswer {
  questionNum: number;
  score: number; // 0 - 1
  answer?: string | Date; // bother with the date type?
  isMultipleChoice: boolean;
}
