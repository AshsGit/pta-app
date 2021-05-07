export interface WPTASSubmission {
  submissionDate?: Date;
  answers: Array<WPTASAnswer>;
  examinerInitials?: string, 
  patientId: string;
  submissionId?: string;
  total?: number;
}

export interface WPTASAnswer {
  questionNum: number;
  score: number; // 0 - 1 
  answer?: string;
  multiChoiceGiven: boolean;
}

interface NonImageQuestionBase<QType extends 'date' | 'text' | 'select'> {
  title: string;
  questionNum: number;
  questionType: QType;
  multichoiceGenerator: (correctAnswer: string) => string[];
  correctAnswerGenerator: () => string; //change any type to () => Promise<string>
}

export type WPTASTextQuestion = NonImageQuestionBase<'text'>;
export type WPTASDateQuestion = NonImageQuestionBase<'date'>;
export type WPTASSelectQuestion = NonImageQuestionBase<'select'> & {
  choices: Array<string | number>;
};

export type WPTASNonImageQuestion =
  | WPTASTextQuestion
  | WPTASDateQuestion
  | WPTASSelectQuestion;

export interface WPTASFaceQuestion {
  title: string;
  questionNum: number;
  questionType: 'face_question';
  image_names: string[]; //there must be exactly enough images to fill dimensions
  correctAnswerGenerator: () => string; //change any type to () => Promise<string>
}

export interface WPTASPicturesQuestion {
  title: string;
  questionNum: number[];
  questionType: 'pictures_question';
  image_names: string[]; //there must be exactly enough images to fill dimensions
  correctAnswerGenerator: () => string[];
  newPics: (thisWeeksPics: string[]) => string[];
}

export type WPTASQuestion =
  | WPTASNonImageQuestion
  | WPTASFaceQuestion
  | WPTASPicturesQuestion;

