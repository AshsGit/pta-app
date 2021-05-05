import { WPTASQuestion } from '../types/WPTAS';

const questions: Array<WPTASQuestion> = [
  { title: 'How old are you?', 
    questionNum: 1, 
    questionType: 'text',
    multichoiceGenerator: function res(correctAnswer: number): Array<number> {
      var choices: Array<number> = [correctAnswer];
      var max:number = correctAnswer;
      var min:number = correctAnswer;
      var i: number = 0;
      var myRandom:number;
      while (i < 2) {
        myRandom = Math.floor(Math.random() * 2);
        if (myRandom < 1 && (min - 1) > 0){
          choices.push(min - 1);
          min -= 1;
        } else {
          choices.push(max + 1)
          max += 1;
        }
        i++;
      }
      var finalChoices: Array<number>;
      while (finalChoices.length < 3) {
        myRandom = Math.floor(Math.random() * choices.length);
        finalChoices.push((choices.splice(myRandom, 1)).pop());
      }
      return finalChoices;
    },
    correctAnswerGenerator: () => 5
  },
  {
    title: 'What is your date of birth?',
    questionNum: 2,
    questionType: 'date',
    multichoiceGenerator: function res(correctAnswer: Date): Array<Date> {
      var choices: Array<Date> = [correctAnswer];
      var i: number = 0;
      var max:Date = new Date(correctAnswer);
      var min:Date = new Date(correctAnswer);
      var newChoice:Date = correctAnswer;
      var myRandom:number;
      while (i < 2) {
        myRandom = Math.floor(Math.random() * 2);
        var newChoice: Date = new Date();
        if (myRandom < 1){
          newChoice.setDate(min.getDate() - 1);
          choices.push(newChoice);
          min.setDate(newChoice.getDate());
        } else {
          newChoice.setDate(max.getDate() + 1);
          choices.push(newChoice);
          max.setDate(newChoice.getDate());
        }
        i++;
      }
      var finalChoices: Array<Date>;
      while (finalChoices.length < 3) {
        myRandom = Math.floor(Math.random() * choices.length);
        finalChoices.push((choices.splice(myRandom, 1)).pop());
      }
      return finalChoices;
    },
    correctAnswerGenerator: () => new Date(1990, 5, 18),
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
      var choices:Array<number>;
      var finalChoices:Array<string>;
      var i: number = 0;
      var correctMonth:number;
      var max: number;
      var min: number;
      if (correctAnswer === "January") {
        correctMonth = 0;
      } else if (correctAnswer === "February") {
        correctMonth = 1;
      } else if (correctAnswer === "March") {
        correctMonth = 2;
      } else if (correctAnswer === "April") {
        correctMonth = 3;
      } else if (correctAnswer === "May") {
        correctMonth = 4;
      } else if (correctAnswer === "June") {
        correctMonth = 5;
      } else if (correctAnswer === "July") {
        correctMonth = 6;
      } else if (correctAnswer === "August") {
        correctMonth = 7;
      } else if (correctAnswer === "September") {
        correctMonth = 8;
      } else if (correctAnswer === "October") {
        correctMonth = 9;
      } else if (correctAnswer === "November") {
        correctMonth = 10;
      } else if (correctAnswer === "December") {
        correctMonth = 11;
      }
      choices.push(correctMonth);
      max = correctMonth;
      min = correctMonth;
      var myRandom: number;
      while (i < 2) {
        myRandom = Math.floor(Math.random() * 2);
        if (myRandom < 1 && (min - 1) >= 0){
          choices.push(min - 1);
          min -= 1;
          i++;
        } else if (myRandom > 0 && (max + 1) < 12) {
          choices.push(max + 1);
          max += 1;
          i++;
        }
      }
      while (finalChoices.length < 3) {
        myRandom = Math.floor(Math.random() * choices.length);
        var month: number = (choices.splice(myRandom, 1)).pop();
        if (month == 0) {
          finalChoices.push("January");
        } else if (month == 1){
          finalChoices.push("February");
        } else if (month == 2) {
          finalChoices.push("March");
        } else if (month == 3) {
          finalChoices.push("April");
        } else if (month == 4) {
          finalChoices.push("May");
        } else if (month == 5) {
          finalChoices.push("June");
        } else if (month == 6) {
          finalChoices.push("July");
        } else if (month == 7) {
          finalChoices.push("August");
        } else if (month == 8) {
          finalChoices.push("September");
        } else if (month == 9) {
          finalChoices.push("October");
        } else if (month == 10) {
          finalChoices.push("November");
        } else if (month == 11){
          finalChoices.push("December");
        }
      }
      return finalChoices;    
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
      var date:Date = new Date();
      var hour:number = date.getHours();
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
      var choices:Array<number>;
      var i: number = 0;
      var correctDay:number;
      var finalChoices:Array<string>;
      if (correctAnswer === "Sunday") {
        correctDay = 0;
      } else if (correctAnswer === "Monday"){
        correctDay = 1;
      } else if (correctAnswer === "Tuesday") {
        correctDay = 2;
      } else if (correctAnswer === "Wednesday") {
        correctDay = 3;
      } else if (correctAnswer === "Thursday") {
        correctDay = 4;
      } else if (correctAnswer === "Friday") {
        correctDay = 5;
      } else if (correctAnswer === "Saturday") {
        correctDay = 6;
      }
      choices.push(correctDay);
      var max: number = correctDay;
      var min: number = correctDay;
      var myRandom: number;
      var around:number;
      while (i < 2) {
        myRandom = Math.floor(Math.random() * 2);
        if (myRandom < 1 ){
          if ((min - 1) < 0) {
            around = 6 + (min - 1) + 1;
            choices.push(around);
          } else {
            choices.push(min - 1);
          }
          min -= 1;
          i++;
        } else if (myRandom > 0) {
          if ((max + 1) > 6){
            around = max + 1 - 7
            choices.push(around);
          } else {
            choices.push(max + 1);
          }
          max += 1;
          i++;
        }
      }
      while (finalChoices.length < 3) {
        myRandom = Math.floor(Math.random() * choices.length);
        var day: number = (choices.splice(myRandom, 1)).pop();
        if (day == 0) {
          finalChoices.push("Sunday");
        } else if (day == 1){
          finalChoices.push("Monday");
        } else if (day == 2) {
          finalChoices.push("Tuesday");
        } else if (day == 3) {
          finalChoices.push("Wednesday");
        } else if (day == 4) {
          finalChoices.push("Thursday");
        } else if (day == 5) {
          finalChoices.push("Friday");
        } else {
          finalChoices.push("Saturday");
        }
      }
      return finalChoices;
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
      var myRandom:number;
      var max: number = correctAnswer;
      var min: number = correctAnswer;
      while (i < 2) {
        myRandom = Math.floor(Math.random() * 2);
        if (myRandom < 1 && (min - 1) > 0){
          choices.push(min - 1);
          min -= 1;
        } else {
          choices.push(max + 1)
          max += 1;
        }
        i++;
      }
      var finalChoices: Array<number>;
      while (finalChoices.length < 3) {
        myRandom = Math.floor(Math.random() * choices.length);
        finalChoices.push((choices.splice(myRandom, 1)).pop());
      }
      return finalChoices;
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
    multichoiceGenerator: (correctAnswer: string) => [correctAnswer, 'The Royal Melbourne Hospital', "St. Vincent's Hospital"].sort(Math.random),
    correctAnswerGenerator: () => 'Epworth Hospital',
  },

  // Or change question type to 'special'?
  { 
    title: 'Face', 
    questionNum: 8, 
    questionType: 'face_question',
    image_names: ["lungile", "florence", "rin"],
    correctAnswerGenerator: () => 'lungile'
  },
  { 
    title: 'Name', 
    questionNum: 9, 
    questionType: 'text',
    multichoiceGenerator: c => [c, 'steve', 'bobby'],
    correctAnswerGenerator: () => 'lungile'
  },

  { 
    title: 'Pictures', 
    questionNum: [10, 11, 12], 
    questionType: 'pictures_question',
    image_names: ['clock', 'fork', 'scissors', 'teacup', 'toothbrush', 'sunflower', 'pen', 'keys', 'bird'],
    correctAnswerGenerator: () => ['fork', 'scissors', 'bird'],
    newPics: (_) => ["clock", "keys", "pen"],
  },
];

export default questions;
