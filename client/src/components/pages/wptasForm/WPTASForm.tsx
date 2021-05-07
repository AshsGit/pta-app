import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import {
  Box,
  CssBaseline,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { WPTASTheme } from '../../../themes';
import { 
  questions, 
  correct_answers, 
  question_count 
} from '../../../data/wptas_questions';
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
  e.initialsError ||
  e.answerErrors.some((v) => v);


export const WPTASForm: FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams() as any;
  const wptasService = new WptasService();
  const correctAnswers = questions.map(question => {
    if (question.questionType === 'pictures_question') {

    } else if (question.questionType === 'face_question') {
    } else {

    }
  });

  // Form state variables
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);

  // Form input states
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean[]>(
    new Array(question_count).fill(false)
  );
  const [questionResponses, setQuestionResponses] = useState<string[]>(
    new Array(question_count).fill('')
  );
  const [multiChoiceGiven, setMultiChoiceGiven] = useState<boolean[]>(
    new Array(question_count).fill(false)
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
    setErrors({ ...errors, initialsError: event.target.value === '' });
  };
  const setMultiChoiceUsed = (question_index: number, val: boolean) => { //used by all questions
    const temp = [...multiChoiceGiven];
    temp[question_index] = val;
    setMultiChoiceGiven(temp);
  }
  const setQuestionCorrect = (question_index: number, val: boolean) => { //used by all questions
    const temp = [...answeredCorrectly];
    temp[question_index] = val;
    setAnsweredCorrectly(temp);
  }
  const getResponseOnChange = (question_index: number) => ( //used by non-image questions
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const temp = [...questionResponses];
    temp[question_index] = event.target.value;
    setQuestionResponses(temp);
  }
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, id) => {
    event.preventDefault();

    setSubmitPressed(true);

    const newErrors: InputErrors = {
      answerErrors: new Array(question_count).fill(false),
      initialsError: (initials === ''),
    };

    multiChoiceGiven.forEach((mc_given, q_index) => {
      if (mc_given) {
        //TODO compare multi-choice answer to correct answer 
        newErrors.answerErrors[q_index] = true; //Error always for now
      } else {
        newErrors.answerErrors[q_index] = answeredCorrectly[q_index];
      }
    });

    const formIncomplete = false; //hasError(newErrors);

    if (formIncomplete) {
      setErrors(newErrors);
    } else {
      // Submit form if no errors
      setLoading(true);
      /*const submission: WPTASSubmission = {
        patientId: id,
        submissionId: '', //FIXME?
        examinerInitials: initials,
        answers: answeredCorrectly.map(
          (correct, i) =>
            ({
              questionNum: i + 1,
              score: correct ? 1 : 0,
              answer: questionResponses[i],
              multiChoiceGiven: multiChoiceGiven[i],
            } as WPTASAnswer)
        ),
      };*/
      const submission: WPTASSubmission = {
        patientId: '1',
        submissionId: '', //FIXME?
        examinerInitials: 'ab',
        answers: answeredCorrectly.map(
          (correct, i) =>
            ({
              questionNum: i + 1,
              score: 1,
              answer: '',
              multiChoiceGiven: false,
            } as WPTASAnswer)
        ),
      };

      wptasService.submit(submission).subscribe(
        result => {
          console.log('submit done', result);
          setLoading(false);
          setSubmitted(true);
        },
        err => {
          console.log('Error:', err);
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
              <form onSubmit={($event) => handleSubmit($event, id)}>
                <Box
                  display='flex'
                  flexDirection='column'
                  className={classes.questionsContainer}
                >
                  {questions.map((question) => (
                    <WPTASQuestion
                      key={`${question.questionNum}`}
                      question={question}
                      setMultiChoiceUsed={setMultiChoiceUsed}
                      setQuestionCorrect={setQuestionCorrect}
                      getResponseOnChange={getResponseOnChange}
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
                      onChange={(e) => {
                        setInitials(e.target.value);
                      }}
                      label='Initials...'
                      placeholder=''
                      size='medium'
                    />
                    <FilledButton
                      type='submit'
                      width={400}
                      style={{ fontSize: '18px' }}
                    >
                      Submit
                    </FilledButton>
                  </Box>
                </Box>
              </form>
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
