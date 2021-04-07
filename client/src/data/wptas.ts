import { WPTASQuestion } from '../types/WPTAS';

const questions: Array<WPTASQuestion> = [
  { title: 'How old are you?', questionNum: 1, questionType: 'text' },
  {
    title: 'What is your date of birth?',
    questionNum: 2,
    questionType: 'date',
  },
  {
    title: 'What month are we in?',
    questionNum: 3,
    questionType: 'select',
    choices: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  {
    title: 'What time of day is it?',
    questionNum: 4,
    questionType: 'select',
    choices: ['Morning', 'Afternoon', 'Evening'],
  },
  {
    title: 'What day of the week is it?',
    questionNum: 5,
    questionType: 'select',
    choices: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  },
  { title: 'What year are we in?', questionNum: 6, questionType: 'text' },
  {
    title: 'What is the name of this place?',
    questionNum: 7,
    questionType: 'text',
  },
  // Or change question type to 'special'?
  { title: 'Face', questionNum: 8, questionType: 'select' },
  { title: 'Name', questionNum: 9, questionType: 'text' },
  { title: 'Picture 1', questionNum: 10, questionType: 'select' },
  { title: 'Picture 2', questionNum: 11, questionType: 'select' },
  { title: 'Picture 3', questionNum: 12, questionType: 'select' },
];

export default questions;
