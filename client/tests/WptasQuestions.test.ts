import sinon from 'sinon';
import questions from '../src/data/wptas_questions';
import { WPTASNonImageQuestion } from '../src/types/WPTAS';
import * as getRandomModule from '../src/data/getRandom';

sinon.stub(getRandomModule, 'getRandom').returns(2);

describe('Testing WPTAS Question Generators', () => {
  const age = '30';
  const dob = new Date(1999, 0, 25).toDateString();
  var now;
  var clock;
  beforeEach(() => {
    now = new Date(2021, 6, 15);
    clock = sinon.useFakeTimers(now.getTime());
  });
  afterEach(() => {
    clock.restore();
  });
  describe('Question 1', () => {
    test('Multiple choice generator', () => {
      let choices = (questions[0] as WPTASNonImageQuestion).multichoiceGenerator(
        age
      );
      expect(choices).toEqual(['28', '29', '30']);
    });
  });

  describe('Question 2', () => {
    test('Multiple choice generator', () => {
      let choices = (questions[1] as WPTASNonImageQuestion).multichoiceGenerator(
        dob
      );
      expect(choices).toEqual([
        'Sat Jan 23 1999',
        'Sun Jan 24 1999',
        'Mon Jan 25 1999',
      ]);
    });
  });

  describe('Question 3', () => {
    test('Multiple choice generator', () => {
      let choices = (questions[2] as WPTASNonImageQuestion).multichoiceGenerator(
        'July'
      );
      expect(choices).toEqual(['May', 'June', 'July']);
    });
    test('Correct answer generator', () => {
      let month = (questions[2] as WPTASNonImageQuestion).correctAnswerGenerator();
      expect(month).toEqual('July');
    });
  });

  describe('Question 4', () => {
    describe('Correct answer generator', () => {
      afterEach(() => {
        clock.restore();
      });
      test('Morning', () => {
        now = new Date(2021, 6, 15, 11, 59, 59);
        clock = sinon.useFakeTimers(now.getTime());
        let time = (questions[3] as WPTASNonImageQuestion).correctAnswerGenerator();
        expect(time).toEqual('Morning');
      });
      test('Afternoon', () => {
        now = new Date(2021, 6, 15, 12);
        clock = sinon.useFakeTimers(now.getTime());
        let time = (questions[3] as WPTASNonImageQuestion).correctAnswerGenerator();
        expect(time).toEqual('Afternoon');
      });
      test('Night', () => {
        now = new Date(2021, 6, 15, 17);
        clock = sinon.useFakeTimers(now.getTime());
        let time = (questions[3] as WPTASNonImageQuestion).correctAnswerGenerator();
        expect(time).toEqual('Evening');
      });
    });
  });

  describe('Question 5', () => {
    test('Multiple choice generator', () => {
      let choices = (questions[4] as WPTASNonImageQuestion).multichoiceGenerator(
        'Thursday'
      );
      expect(choices).toEqual(['Tuesday', 'Wednesday', 'Thursday']);
    });
    test('Correct answer generator', () => {
      let day = (questions[4] as WPTASNonImageQuestion).correctAnswerGenerator();
      expect(day).toEqual('Thursday');
    });
  });

  describe('Question 6', () => {
    test('Multiple choice generator', () => {
      let choices = (questions[5] as WPTASNonImageQuestion).multichoiceGenerator(
        '2021'
      );
      expect(choices).toEqual(['2019', '2020', '2021']);
    });
    test('Correct answer generator', () => {
      let day = (questions[5] as WPTASNonImageQuestion).correctAnswerGenerator();
      expect(day).toEqual('2021');
    });
  });
});
