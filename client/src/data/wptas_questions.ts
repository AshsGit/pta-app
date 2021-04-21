import { WPTASQuestion } from '../types/WPTAS';

const questions: Array<WPTASQuestion> = [
  { title: 'How old are you?', 
    questionNum: 1, 
    questionType: 'text',
    multichoiceGenerator: function res(correctAnswer: number): Array<number> {
      var choices: Array<number> = [correctAnswer];
      var i: number = 0;
      while (i < 3) {
        var myRandom = Math.floor(Math.random() * (5 - 1 + 1) + 1);
        var minus = Math.floor(Math.random() * 2);
        if (minus == 1 && (correctAnswer - myRandom) > 1){
          if (!choices.includes(correctAnswer - myRandom)) {
            choices.push(correctAnswer - myRandom);
            i++;
          }
        } else {
          if (!choices.includes(correctAnswer + myRandom)) {
            choices.push(correctAnswer + myRandom)
            i++;
          }
        }
      }
      return choices;
    }
  },

  {
    title: 'What is your date of birth?',
    questionNum: 2,
    questionType: 'date',
    multichoiceGenerator: function res(correctAnswer: Date): Array<Date> {
      var choices: Array<Date> = [correctAnswer];
      var i: number = 0;
      var newChoice = correctAnswer;
      while (i < 3) {
        var myRandom = Math.floor(Math.random() * (15 - 1 + 1) + 1);
        var minus = Math.floor(Math.random() * 2);
        if (minus == 1){
          newChoice.setDate(newChoice.getDate() - myRandom);
          if (!choices.includes(newChoice)){
            choices.push(newChoice);
            i++;
          }
        } else {
          newChoice.setDate(newChoice.getDate() + myRandom);
          if (!choices.includes(newChoice)) {
            choices.push(newChoice);
            i++;
          }
        }
      }
      return choices;
    }
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
    multichoiceGenerator: function res(correctAnswer:string):Array<string>{
      var choices:Array<string> = [correctAnswer];
      var i: number = 0;
      while (i < 3) {
        var myRandom = Math.floor(Math.random() * 12);
        if (myRandom == 0 && !choices.includes("January")) {
          choices.push("January");
          i++;
        } else if (myRandom == 1 && !choices.includes("February")) {
          choices.push("February");
          i++;
        } else if (myRandom == 2 && !choices.includes("March")) {
          choices.push("March");
          i++;
        } else if (myRandom == 3 && !choices.includes("April")) {
          choices.push("April");
          i++;
        } else if (myRandom == 4 && !choices.includes("May")) {
          choices.push("May");
          i++;
        } else if (myRandom == 5 && !choices.includes("June")) {
          choices.push("June");
          i++;
        } else if (myRandom == 6 && !choices.includes("July")) {
          choices.push("July");
          i++;
        } else if (myRandom == 6 && !choices.includes("August")) {
          choices.push("August");
          i++;
        } else if (myRandom == 6 && !choices.includes("September")) {
          choices.push("September");
          i++;
        } else if (myRandom == 6 && !choices.includes("October")) {
          choices.push("October");
          i++;
        } else if (myRandom == 6 && !choices.includes("November")) {
          choices.push("November");
          i++;
        } else if (myRandom == 6 && !choices.includes("December")) {
          choices.push("December");
          i++;
        }
      }
      return choices;
    },
    correctAnswerGenerator: function res(): string {
      var date = new Date();
      var month = date.getUTCMonth() + 1;
      if (month == 1) {
        return "January";
      } else if (month == 2){
        return "February";
      } else if (month == 3) {
        return "March";
      } else if (month == 4) {
        return "April";
      } else if (month == 5) {
        return "May";
      } else if (month == 6) {
        return "June";
      } else if (month == 7) {
        return "July";
      } else if (month == 8) {
        return "August";
      } else if (month == 9) {
        return "September";
      } else if (month == 10) {
        return "October";
      } else if (month == 11) {
        return "November";
      } else {
        return "December";
      }
    }
  },

  {
    title: 'What time of day is it?',
    questionNum: 4,
    questionType: 'select',
    choices: ['Morning', 'Afternoon', 'Evening'],
    multichoiceGenerator: function res(): Array<string>{
      var choices: Array<string>;
      var i: number = 0;
      while (i < 3) {
        var myRandom = Math.floor(Math.random() * 3);
        if (myRandom == 0 && !choices.includes("Morning")) {
          choices.push("Morning");
          i++;
        } else if (myRandom == 1 && !choices.includes("Afternoon")) {
          choices.push("Afternoon");
          i++;
        } else if (myRandom == 2 && !choices.includes("Evening")) {
          choices.push("Evening");
          i++;
        }
      }
      return choices;
    },
    correctAnswerGenerator: function res(): string {
      var date = new Date();
      var hour = date.getHours();
      if (hour >= 12 && hour <= 17) {
        return "Afternoon";
      } else if (hour >= 17) {
        return "Evening";
      } else {
        return "Morning";
      }
    }
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
    multichoiceGenerator: function res(correctAnswer:string):Array<string>{
      var choices:Array<string> = [correctAnswer];
      var i: number = 0;
      while (i < 3) {
        var myRandom = Math.floor(Math.random() * 7);
        if (myRandom == 0 && !choices.includes("Monday")) {
          choices.push("Monday");
          i++;
        } else if (myRandom == 1 && !choices.includes("Tuesday")) {
          choices.push("Tuesday");
          i++;
        } else if (myRandom == 2 && !choices.includes("Wednesday")) {
          choices.push("Wednesday");
          i++;
        } else if (myRandom == 3 && !choices.includes("Thursday")) {
          choices.push("Thursday");
          i++;
        } else if (myRandom == 4 && !choices.includes("Friday")) {
          choices.push("Friday");
          i++;
        } else if (myRandom == 5 && !choices.includes("Saturday")) {
          choices.push("Saturday");
          i++;
        } else if (myRandom == 6 && !choices.includes("Sunday")) {
          choices.push("Sunday");
          i++;
        }
      }
      return choices;
    },
    correctAnswerGenerator: function res(): string {
      var date = new Date();
      var day = date.getDay();
      if (day == 0) {
        return "Sunday";
      } else if (day == 1){
        return "Monday";
      } else if (day == 2) {
        return "Tuesday";
      } else if (day == 3) {
        return "Wednesday";
      } else if (day == 4) {
        return "Thursday";
      } else if (day == 5) {
        return "Friday";
      } else if (day == 6) {
        return "Saturday";
      }
    }
    
  },

  { 
    title: 'What year are we in?', 
    questionNum: 6, 
    questionType: 'text',
    multichoiceGenerator: function res(correctAnswer: number): Array<number> {
      var choices: Array<number> = [correctAnswer];
      var i: number = 0;
      var newChoice = correctAnswer;
      while (i < 3) {
        var myRandom = Math.floor(Math.random() * (20 - 1 + 1) + 1);
        var minus = Math.floor(Math.random() * 2);
        if (minus == 1){
          newChoice -= myRandom;
          if (!choices.includes(newChoice)){
            choices.push(newChoice);
            i++;
          }
        } else {
          newChoice += myRandom;
          if (!choices.includes(newChoice)) {
            choices.push(newChoice);
            i++;
          }
        }
      }
      return choices;
    },
    correctAnswerGenerator: function res(): number {
      var date = new Date();
      var year = date.getUTCFullYear();
      return year;
    }
   },
  
  {
    title: 'What is the name of this place?',
    questionNum: 7,
    questionType: 'text',
  },

  // Or change question type to 'special'?
  { 
    title: 'Face', 
    questionNum: 8, 
    questionType: 'image',
    image_names: ["lungile", "florence", "rin"],
    dimensions: '1x3'
  },
  { title: 'Name', questionNum: 9, questionType: 'text' },

  { title: 'Picture 1', questionNum: 10, questionType: 'select' },

  { title: 'Picture 2', questionNum: 11, questionType: 'select' },

  { title: 'Picture 3', questionNum: 12, questionType: 'select' },
];

export default questions;
