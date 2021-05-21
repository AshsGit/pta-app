import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import {
  Box,
  CircularProgress,
  CssBaseline,
  FormHelperText,
  Grid,
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
import { ABSTheme } from '../../../themes';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Home from '@material-ui/icons/Home';
import { ABSAnswer, ABSSubmission } from '../../../types/ABS';
import { ABSQuestion as ABSQuestionComponent } from './ABSQuestion';
import { useHistory, useParams } from 'react-router-dom';
import questions from '../../../data/abs';
import { AbsService } from '../../../services/AbsService';
import { FilledButton } from '../../layout/Buttons';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root_content: {
      width: '100%',
      margin: '3rem 2rem 2rem 2rem',
      padding: '2rem',
      zIndex: 2,
      textAlign: 'left',
    },
    background: {
      position: 'absolute',
      width: '100%',
      height: '18rem',
      top: 0,
      backgroundColor: 'var(--color-accent-dark)',
    },
    backButton: {
      position: 'absolute',
      fontSize: 'large',
      float: 'left',
      paddingTop: '1.1rem',
      size: 'large',
    },
    headerQuestion: {
      marginBottom: '1rem',
    },
    successfulSubmit: {
      marginBottom: '0.5rem',
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

const Background: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.background} />
    </React.Fragment>
  );
};

// Error handling
type InputErrors = {
  answerErrors: boolean[];
  initialsError: boolean;
};

const hasError = (e: InputErrors): boolean =>
  e.initialsError || e.answerErrors.some((v) => v);

const questionError = (index: number, e: InputErrors) => e.answerErrors[index];

export const ABSForm: FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams() as any;
  const absService = new AbsService();

  // Form state variables
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitPressed, setSubmitPressed] = useState<boolean>(false);

  // Form input states
  const [initials, setInitials] = useState('');
  const [questionAnswers, setQuestionAnswers] = useState<string[]>(
    new Array(questions.length).fill('')
  );

  // Error handling
  const [errors, setErrors] = useState<InputErrors>({
    initialsError: false,
    answerErrors: new Array(questions.length).fill(false),
  });

  // Change handlers
  const initialsOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInitials(event.target.value);
    setErrors({ ...errors, initialsError: event.target.value === '' });
  };
  const getChangeHandle = (question_index: number) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const new_ans_errors = [...errors.answerErrors];
    new_ans_errors[question_index] = false;
    setErrors({ ...errors, answerErrors: new_ans_errors });

    const temp = [...questionAnswers];
    temp[question_index] = event.target.value;
    setQuestionAnswers(temp);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, id) => {
    event.preventDefault();

    setSubmitPressed(true);

    const newErrors: InputErrors = {
      answerErrors: new Array(questions.length).fill(false),
      initialsError: false,
    };

    if (initials === '') newErrors.initialsError = true;

    questionAnswers.forEach((val, index) => {
      if (val === '') newErrors.answerErrors[index] = true;
    });

    const formIncomplete = hasError(newErrors);

    if (formIncomplete) {
      setErrors(newErrors);
    } else {
      // Submit form if no errors
      setLoading(true);
      let startDate = new Date();
      let endDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      addDays(endDate, 1);

      const submission: ABSSubmission = {
        patientId: id,
        submissionId: '',
        examinerInitials: initials,
        periodOfObs_to: startDate as Date,
        periodOfObs_from: endDate as Date,
        answers: questionAnswers.map(
          (score, i) =>
            ({
              questionNum: i + 1,
              score: Number(score),
            } as ABSAnswer)
        ),
      };

      absService.submit(submission).subscribe(
        (result) => {
          console.log('submit done', result);
          setLoading(false);
          setSubmitted(true);
        },
        (err) => {
          console.log('Error:', err);
          setLoading(false);
          // TODO: provide a ui error
        }
      );
    }
  };

  return (
    <ThemeProvider theme={ABSTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <Background />
        <div className={classes.page}>
          <Paper variant='outlined' className={classes.root_content}>
            <form onSubmit={($event) => handleSubmit($event, id)}>
              <Grid container direction='column' spacing={5}>
                <IconButton
                  aria-label='back'
                  className={classes.backButton}
                  onClick={() => history.push(`/${id}`)}
                >
                  <Home fontSize='large' />
                </IconButton>
                <Grid item>
                  <Typography variant='h1' color='textPrimary' align='center'>
                    ABS
                  </Typography>
                </Grid>
                {submitted ? (
                  <Grid item>
                    <div className={classes.successfulSubmit}>
                      You have successfully submitted your response!
                    </div>
                  </Grid>
                ) : (
                  <React.Fragment>
                    <Grid item container direction='column' spacing={5}>
                      <ABSInfoText />
                    </Grid>
                    <br />
                    <Grid item container spacing={8} direction='column'>
                      {questions.map((question, index) => (
                        <Grid item key={index}>
                          {
                            <ABSQuestionComponent
                              question={question}
                              onChange={getChangeHandle(index)}
                              error={questionError(index, errors)}
                            />
                          }
                        </Grid>
                      ))}
                    </Grid>
                    <Grid item container justify='flex-end'>
                      <Box
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
                          error={errors.initialsError}
                          helperText={
                            errors.initialsError
                              ? 'Please enter your initials'
                              : ''
                          }
                        />
                        {loading ? (
                          <CircularProgress />
                        ) : (
                          <FilledButton
                            type='submit'
                            width={400}
                            style={{ fontSize: '18px' }}
                          >
                            Submit
                          </FilledButton>
                        )}
                      </Box>
                    </Grid>
                    <Box
                      justifyContent='flex-end'
                      style={{ padding: '0 20px 10px 20px' }}
                    >
                      <FormHelperText
                        style={{ textAlign: 'end' }}
                        error={hasError(errors)}
                      >
                        {hasError(errors) && submitPressed
                          ? 'Please resolve all errors'
                          : ''}
                      </FormHelperText>
                    </Box>
                  </React.Fragment>
                )}
              </Grid>
            </form>
          </Paper>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

const ABSInfoText = () => (
  <Box style={{ padding: '20px' }}>
    <Typography variant='body2'>
      At the end of the observation period indicate whether the behavior
      described in each item was present and, if so, to what degree: slight,
      moderate or extreme. Use the following numerical values and criteria for
      your ratings.
      <br />
      <br />
      Ratings are for the last 24 hour period, and measure the behaviour at its
      highest level even if this was not evident the entire time.
      <br />
      <br />
      <b>1 = absent:</b> the behavior is not present. <br />
      <b>2 = present to a slight degree:</b> the behavior is present but does
      not prevent the conduct of other, contextually appropriate behavior. (The
      individual may redirect spontaneously, or the continuation of the agitated
      behavior does not disrupt appropriate behavior.)
      <br />
      <b>3 = present to a moderate degree:</b> the individual needs to be
      redirected from an agitated to an appropriate behavior, but benefits from
      such cueing.
      <br />
      <b>4 = present to an extreme degree:</b> the individual is not able to
      engage in appropriate behavior due to the interference of the agitated
      behavior, even when external cueing or redirection is provided.
    </Typography>
  </Box>
);

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
