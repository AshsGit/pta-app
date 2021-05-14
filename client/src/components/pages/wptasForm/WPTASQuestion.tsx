import React, { ChangeEvent, FC } from 'react';
import { WPTASPictureQuestion } from './WPTASPictureQuestion';
import { WPTASFaceQuestion } from './WPTASFaceQuestion';
import { WPTASNonImageQuestion } from './WPTASNonImageQuestion';
import { WPTASQuestion as WPTASQuestionType } from '../../../types/WPTAS';

export const WPTASQuestion: FC<any> = ({
  question,
  correctAnswerPositionOverride,
  ...rest
}: {
  question: WPTASQuestionType;
  correctAnswerPositionOverride?: number;
  setQuestionMultiChoiceGiven: (
    q_index: number | Array<number>,
    val: boolean
  ) => void;
  setQuestionCorrect: (
    questoinNum: number | Array<number>,
    val: boolean
  ) => void;
  getResponseOnChange: (
    q_index: number
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  error_: boolean;
}) => {
  switch (question.questionType) {
    case 'face_question':
      return <WPTASFaceQuestion question={question} {...rest} />;
    case 'pictures_question':
      return <WPTASPictureQuestion question={question} {...rest} />;
    default:
      return (
        <WPTASNonImageQuestion
          correctAnswerPositionOverride={correctAnswerPositionOverride}
          question={question}
          {...rest}
        />
      );
  }
};
