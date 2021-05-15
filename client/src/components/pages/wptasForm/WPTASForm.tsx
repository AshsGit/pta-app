import React, { ChangeEvent, FC, FunctionComponent, useState } from 'react';
import {
  Box,
  CircularProgress,
  CssBaseline,
  IconButton,
  Paper,
  TextField,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { WPTASTheme } from '../../../themes';
import { questions, question_count } from '../../../data/wptas_questions';
import { WptasService } from '../../../services/WptasService';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { useHistory, useParams } from 'react-router-dom';

import { FilledButton } from '../../layout/Buttons';
import { WPTASQuestion } from './WPTASQuestion';
import { WPTASAnswer, WPTASSubmission } from '../../../types/WPTAS';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root_content: {
      position: 'relative',
      width: '100%',
      margin: '3rem 2rem 2rem 2rem',
      padding: '0 2rem 2rem 2rem',
      zIndex: 2,
      textAlign: 'left',
    },
    background: {
      position: 'absolute',
      width: '100%',
      height: '18rem',
      top: 0,
      backgroundColor: 'var(--color-primary-dark)',
    },
    questionsContainer: {
      '&>*': { marginBottom: '1.5rem' },
    },
    backButton: {
      position: 'absolute',
      left: '.5rem',
    },
    header: {
      paddingTop: '2rem',
      paddingBottom: '1rem',
    },
    successfulSubmit: {
      marginTop: '1rem',
      fontSize: '16px',
    },
    page: {
      display: 'flex',
      alignItems: 'flex-start',
      height: '100%',
      minHeight: '100vh',
      maxWidth: 'var(--max-app-width)',
      flexGrow: 1,
      zIndex: 1,
    },
  })
);

// Error handling
type InputErrors = {
  answerErrors: boolean[];
  initialsError: boolean;
};

const hasError = (e: InputErrors): boolean =>
  e.initialsError || e.answerErrors.some((v) => v);

export const WPTASForm: FunctionComponent = () => {
  // Quick fix for child component reload - multiple choice order kept changing when clicked.
  const getRandom = (max) => {
    return Math.floor(Math.random() * max);
  };
  const correctAnswerPositionOverrides = new Array(question_count)
    .fill(1)
    .map((_) => getRandom(3));
  return (
    <WPTASFormContent
      correctAnswerPositionOverrides={correctAnswerPositionOverrides}
    />
  );
};

const WPTASFormContent: FC<any> = ({
  correctAnswerPositionOverrides,
}: {
  correctAnswerPositionOverrides: Array<number>;
}) => {
  const classes = useStyles();
  const { id } = useParams() as any;
  const wptasService = new WptasService();

  // Form state variables
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);

  // Form input states

  // answeredCorrectlyInput reflects the yes/no question titled 'Answered Correctly?'.
  // For questions 1 - 7, 9 this does not reflect if we are in multichoice mode and the correct answer is selected.
  // However for qustions 8, 10 - 12, it is true if the question is answered correctly.
  const [answeredCorrectlyInput, setAnsweredCorrectlyInput] = useState<
    boolean[]
  >(new Array(question_count).fill(null));
  const [questionResponses, setQuestionResponses] = useState<string[]>(
    new Array(question_count).fill('')
  );
  let defaultMultiChoiceGiven = new Array(question_count).fill(false);
  // This question is always a multiple choice question.
  defaultMultiChoiceGiven[7] = true;
  const [multiChoiceGiven, setMultiChoiceGiven] = useState<boolean[]>(
    defaultMultiChoiceGiven
  );
  const [initials, setInitials] = useState('');

  // Error handling
  const [errors, setErrors] = useState<InputErrors>({
    initialsError: true,
    answerErrors: new Array(question_count).fill(true),
  });

  // Change handlers
  const initialsOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInitials(event.target.value);
    setErrors((errors) => ({
      ...errors,
      initialsError: event.target.value === '',
    }));
  };
  const setQuestionMultiChoiceGiven = (
    questionNum: number | Array<number>,
    val: boolean
  ) => {
    if (typeof questionNum === 'number') {
      questionNum = [questionNum];
    }
    //used by all questions
    const temp = [...multiChoiceGiven];
    questionNum.forEach((num: number) => (temp[num - 1] = val));
    setMultiChoiceGiven(temp);
  };
  const setQuestionCorrect = (
    questionNum: number | Array<number>,
    val: boolean | Array<boolean> // Should be same length at questionNum array
  ) => {
    if (typeof questionNum === 'number') {
      questionNum = [questionNum];
    }
    if (typeof val === 'boolean') {
      val = new Array(questionNum.length).fill(val);
    }
    //used by all questions
    const temp = [...answeredCorrectlyInput];
    questionNum.forEach((num: number, i) => (temp[num - 1] = val[i]));
    setAnsweredCorrectlyInput(temp);

    const tempQErrors = [...errors.answerErrors];
    questionNum.forEach((num: number) => (tempQErrors[num - 1] = false));
    setErrors({ ...errors, answerErrors: tempQErrors });
  };
  const getResponseOnChange = (questionNum: number) => (
    //used by non-image questions
    event: ChangeEvent<HTMLInputElement> | string
  ) => {
    const temp = [...questionResponses];
    temp[questionNum - 1] =
      typeof event === 'string' ? event : event.target.value;

    setQuestionResponses(temp);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, id) => {
    event.preventDefault();

    setSubmitPressed(true);

    const newErrors: InputErrors = {
      answerErrors: new Array(question_count).fill(false),
      initialsError: initials === '',
    };

    multiChoiceGiven.forEach((mc_given, q_index) => {
      newErrors.answerErrors[q_index] =
        answeredCorrectlyInput[q_index] === null;
    });

    // TODO: throw an error if (not multiChoice and answered correctly is null) OR (multiChoice and response.length)

    const formIncomplete = hasError(newErrors);

    if (formIncomplete) {
      setErrors(newErrors);
    } else {
      // Submit form if no errors
      setLoading(true);

      const submission: WPTASSubmission = {
        patientId: id,
        examinerInitials: initials,
        answers: multiChoiceGiven
          .filter((_, i) => i < 7)
          .map(
            (mc, i) =>
              ({
                questionNum: i + 1,
                multiChoiceGiven: mc,
                score: mc
                  ? questionResponses[i] ===
                    questions[i].correctAnswerGenerator() // Check if mc answer is correct
                    ? 1
                    : 0
                  : answeredCorrectlyInput[i] // Otherwise check the answered correctly input
                  ? 1
                  : 0,
              } as WPTASAnswer)
          )
          // Face question
          .concat([
            {
              questionNum: 8,
              multiChoiceGiven: multiChoiceGiven[7],
              score: answeredCorrectlyInput[7] // Otherwise check the answered correctly input
                ? 1
                : 0,
            } as WPTASAnswer,
          ])
          // Name question
          .concat([
            {
              questionNum: 9,
              multiChoiceGiven: multiChoiceGiven[8],
              score: multiChoiceGiven[8]
                ? questionResponses[8] === questions[8].correctAnswerGenerator() // Check if mc answer is correct
                  ? 1
                  : 0
                : answeredCorrectlyInput[8] // Otherwise check the answered correctly input
                ? 1
                : 0,
            } as WPTASAnswer,
          ])
          // Picture questions
          .concat(
            multiChoiceGiven
              .filter((_, i) => i >= 9)
              .map((mc, i) => {
                let questionNum = [10, 11, 12][i];
                return {
                  questionNum: questionNum,
                  multiChoiceGiven: mc,
                  score: answeredCorrectlyInput[questionNum - 1] ? 1 : 0,
                } as WPTASAnswer;
              })
          ),
      };

      wptasService.submit(submission).subscribe(
        (result) => {
          setLoading(false);
          setSubmitted(true);
        },
        (err) => {
          setLoading(false);
          // TODO: provide a ui error
        }
      );
    }
  };
  return (
    <ThemeProvider theme={WPTASTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <Background />
        <div className={classes.page}>
          <Paper variant='outlined' className={classes.root_content}>
            <Header />
            <Box>
              {submitted ? (
                <div className={classes.successfulSubmit}>
                  You have successfully submitted your response!
                </div>
              ) : (
                <form>
                  <Box
                    display='flex'
                    flexDirection='column'
                    className={classes.questionsContainer}
                  >
                    {questions.map((question, i) => (
                      <WPTASQuestion
                        correctAnswerPositionOverride={
                          correctAnswerPositionOverrides[i]
                        }
                        key={`${question.questionNum}`}
                        question={question}
                        setQuestionMultiChoiceGiven={
                          setQuestionMultiChoiceGiven
                        }
                        setQuestionCorrect={setQuestionCorrect}
                        getResponseOnChange={getResponseOnChange}
                        error_={
                          submitPressed &&
                          (typeof question.questionNum === 'number'
                            ? errors.answerErrors[question.questionNum - 1]
                            : question.questionNum.some(
                                (q) => errors.answerErrors[q - 1]
                              ))
                        }
                      />
                    ))}
                    <Box
                      style={{ marginTop: '6rem' }}
                      display='flex'
                      alignItems='center'
                      justifyContent='flex-end'
                    >
                      <TextField
                        style={{
                          width: 150,
                          marginRight: '2rem',
                          marginBottom: '0.5rem',
                        }}
                        value={initials}
                        onChange={initialsOnChange}
                        label='Initials...'
                        placeholder=''
                        size='medium'
                        error={submitPressed && errors.initialsError}
                        helperText={
                          submitPressed && errors.initialsError
                            ? 'Please enter your initials'
                            : ''
                        }
                      />
                      {loading ? (
                        <CircularProgress />
                      ) : (
                        <FilledButton
                          onClick={(e) => {
                            if (
                              window.confirm('Are you sure you wish to submit?')
                            )
                              handleSubmit(e, id);
                          }}
                          width={400}
                          style={{ fontSize: '18px' }}
                        >
                          Submit
                        </FilledButton>
                      )}
                    </Box>
                  </Box>
                  <Box
                    justifyContent='flex-end'
                    style={{ padding: '0 20px 10px 20px' }}
                  >
                    <FormHelperText
                      style={{ textAlign: 'end' }}
                      error={hasError(errors)}
                    >
                      {hasError(errors) && submitPressed
                        ? 'Please complete all fields'
                        : ''}
                    </FormHelperText>
                  </Box>
                </form>
              )}
            </Box>
          </Paper>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

const Header: FunctionComponent = () => {
  const { id } = useParams() as any;
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box display='flex' className={classes.header} alignItems='center'>
      <IconButton
        aria-label='back'
        className={classes.backButton}
        onClick={() => history.push(`/${id}`)}
      >
        <ArrowBackSharpIcon fontSize='large' />
      </IconButton>
      <Box flexGrow={1} style={{ textAlign: 'center' }}>
        <Typography variant='h1' color='textPrimary' align='center'>
          WPTAS
        </Typography>
      </Box>
    </Box>
  );
};

const Background: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.background} />
    </React.Fragment>
  );
};
