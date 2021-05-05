import React, { FC } from 'react';
import { WPTASPictureQuestion } from './WPTASPictureQuestion';
import { WPTASFaceQuestion } from './WPTASFaceQuestion';
import { WPTASNonImageQuestion } from './WPTASNonImageQuestion';
import { WPTASQuestion as WPTASQuestionType } from '../../../types/WPTAS';

export const WPTASQuestion: FC<any> = ({
  question,
}: {
  question: WPTASQuestionType;
}) => {
  switch (question.questionType) {
    case 'face_question':
      return <WPTASFaceQuestion question={question} />;
    case 'pictures_question':
      return <WPTASPictureQuestion question={question} />;
    default:
      return <WPTASNonImageQuestion question={question} />;
  }
};
