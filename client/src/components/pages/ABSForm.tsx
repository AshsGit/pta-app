import React, { FunctionComponent, useState, FC, ChangeEvent } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { ABSTheme } from '../../themes';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import { ABSAnswer, ABSQuestion, ABSSubmission } from '../../types/ABS';
import { useHistory, useParams } from 'react-router-dom';
import questions from '../../data/abs';

const submit = (submission: ABSSubmission) =>
  console.log(JSON.stringify(submission));

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root_content: {
      // position: 'absolute',
      // top: '5%',
      // left: '5%',
      // right: '5%',
      // minHeight: '90%',

      margin: '3rem 2rem 2rem 2rem',
      padding: '2.875rem',
      zIndex: 2,
      // '&>*': {
      //   marginBottom: '5.625rem',
      // },
      textAlign: 'left',
    },
    background: {
      position: 'absolute',
      width: '100%',
      height: '18rem',
      top: 0,
      backgroundColor: 'var(--color-accent-dark)',
      // overflowY: 'hidden',
      // scrollBehavior: 'unset',
    },
    backButton: {
      position: 'absolute',
      fontSize: 'large',
      float: 'left',
      paddingTop: '1.1rem',
      size: 'large',
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

type InputErrors = {
  toDateError: boolean;
  fromDateError: boolean;
  obsEnvError: boolean;
  answerErrors: boolean[];
};

const hasError = (e: InputErrors): boolean =>
  e.toDateError ||
  e.fromDateError ||
  e.obsEnvError ||
  e.answerErrors.some((v) => v);
const questionError = (index: number, e: InputErrors) => e.answerErrors[index];

export const ABSForm: FunctionComponent = () => {
  const classes = useStyles();

  // const questions = [
  //   'Short attention span, easy distractibility, inability to concentrate',
  //   'Impulsive, impatient, low tolerance for pain or frustration',
  //   'Uncooperative, resistant to care, demanding',
  //   'Violent and or threatening violence toward people or property',
  // ];

  // const questionCount = questions.length;

  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [obsEnv, setObsEnv] = useState('');
  const [questionAnswers, setQuestionAnswers] = useState<string[]>(
    new Array(questions.length).fill('')
  );
  const [errors, setErrors] = useState<InputErrors>({
    toDateError: false,
    fromDateError: false,
    obsEnvError: false,
    answerErrors: new Array(questions.length).fill(false),
  });

  const obsEnvOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setObsEnv(event.target.value);
    setErrors({ ...errors, obsEnvError: event.target.value === '' });
  };
  const toDateOnChange = (d: Date | null) => {
    setToDate(d);
    setErrors({ ...errors, toDateError: false });
  };
  const fromDateOnChange = (d: Date | null) => {
    setFromDate(d);
    setErrors({ ...errors, fromDateError: false });
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

    const newErrors: InputErrors = {
      toDateError: false,
      fromDateError: false,
      obsEnvError: false,
      answerErrors: new Array(questions.length).fill(false),
    };

    if (toDate === null) newErrors.toDateError = true;
    if (fromDate === null) newErrors.fromDateError = true;
    if (fromDate !== null && toDate !== null && fromDate > toDate)
      newErrors.toDateError = true;
    if (obsEnv === '') newErrors.obsEnvError = true;

    questionAnswers.forEach((val, index) => {
      if (val === '') newErrors.answerErrors[index] = true;
    });

    const formIncomplete = hasError(newErrors);

    if (formIncomplete) {
      setErrors(newErrors);
    } else {
      const submission: ABSSubmission = {
        patientId: id,
        submissionId: '',
        periodOfObs_to: toDate as Date,
        periodOfObs_from: fromDate as Date,
        obsEnv,
        answers: questionAnswers.map(
          (score, i) =>
            ({
              questionNum: i,
              score: Number(score),
            } as ABSAnswer)
        ),
      };
      submit(submission);
    }
  };
  const { id } = useParams() as any;
  const history = useHistory();

  return (
    <ThemeProvider theme={ABSTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <Background />
        <div className='page'>
          <Paper variant='outlined' className={classes.root_content}>
            <form onSubmit={($event) => handleSubmit($event, id)}>
              <Grid container direction='column' spacing={5}>
                <IconButton
                  aria-label='back'
                  className={classes.backButton}
                  onClick={() => history.goBack()}
                >
                  <ArrowBackSharpIcon fontSize='large' />
                </IconButton>
                <Grid item>
                  <Typography variant='h1' color='textPrimary' align='center'>
                    ABS
                  </Typography>
                </Grid>
                <Grid item container direction='column' spacing={5}>
                  <Grid item container direction='column'>
                    <Typography variant='h3'>Period of Observation</Typography>
                    <Grid
                      item
                      container
                      direction='row'
                      spacing={10}
                      wrap='nowrap'
                    >
                      <Grid item xs={5}>
                        <FormControl
                          component='fieldset'
                          fullWidth
                          error={errors.fromDateError}
                        >
                          <KeyboardDatePicker
                            margin='normal'
                            format='dd/MM/yyyy'
                            value={fromDate}
                            onChange={fromDateOnChange}
                            error={errors.fromDateError}
                            autoOk
                            okLabel={false}
                            clearable
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <Typography variant='h3'>From:</Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText>
                            {errors.fromDateError
                              ? 'This field is compulsory!'
                              : ' '}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={5}>
                        <FormControl
                          component='fieldset'
                          fullWidth
                          error={errors.toDateError}
                        >
                          <KeyboardDatePicker
                            margin='normal'
                            format='dd/MM/yyyy'
                            value={toDate}
                            onChange={toDateOnChange}
                            error={errors.toDateError}
                            autoOk
                            okLabel={false}
                            clearable
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <Typography variant='h3'>To:</Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText>
                            {!errors.toDateError
                              ? ' '
                              : fromDate !== null &&
                                toDate !== null &&
                                fromDate > toDate
                              ? "'To' date cannot be less than 'From' date!"
                              : 'This field is compulsory!'}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant='h3'>
                      Observation Environment
                    </Typography>
                    <FormControl
                      component='fieldset'
                      fullWidth
                      error={errors.obsEnvError}
                    >
                      <Input
                        placeholder='e.g. hospital ward bed'
                        fullWidth
                        inputProps={{ 'aria-label': 'description' }}
                        onChange={obsEnvOnChange}
                      />
                      <FormHelperText>
                        {errors.obsEnvError ? 'This field is compulsory!' : ' '}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    {/* TODO: type full description out */}
                    <Typography variant='body2'>
                      At the end of the observation period indicate whether the
                      behavior described in each item was present and, if so, to
                      what degree: slight, moderate or extreme. Use the
                      following numerical values and criteria for your ratings.
                      <br />
                      <br />
                      <b>1 = absent:</b> the behavior is not present. <br />
                      <b>2 = present to a slight degree:</b> the behavior is
                      present ...
                      <br />
                      <b>3 = present to a moderate degree:</b> the individual
                      needs ot be redirected ...
                      <br />
                      <b>4 = present to an extreme degree:</b> the individual is
                      not able to engage in ...
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Grid item container spacing={8} direction='column'>
                  {questions.map((question, index) => (
                    <Grid item key={index}>
                      {ABSQuestionComponent({
                        question,
                        onChange: getChangeHandle(index),
                        error: questionError(index, errors),
                      })}
                    </Grid>
                  ))}
                </Grid>
                <Grid item container justify='flex-end'>
                  <Button
                    type='submit'
                    size='large'
                    variant='outlined'
                    color='primary'
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

type ABSQuestionProps = {
  question: ABSQuestion;
  onChange?: RadioGroupProps['onChange'] | undefined;
  error?: FormControlProps['error'] | undefined;
};

const ABSQuestionComponent: FC<ABSQuestionProps> = ({
  question,
  onChange,
  error,
}) => {
  return (
    <Grid container direction='column' spacing={5}>
      <Grid item>
        <Typography variant='h3'>
          {question.questionNum}. {question.title}
        </Typography>
      </Grid>
      <Grid item>
        <FormControl component='fieldset' fullWidth error={error}>
          <RadioGroup row onChange={onChange}>
            <Grid item container direction='row' justify='space-between'>
              <FormControlLabel
                value='1'
                control={<Radio color='primary' />}
                label='1'
                labelPlacement='end'
              />
              <FormControlLabel
                value='2'
                control={<Radio color='primary' />}
                label='2'
                labelPlacement='end'
              />
              <FormControlLabel
                value='3'
                control={<Radio color='primary' />}
                label='3'
                labelPlacement='end'
              />
              <FormControlLabel
                value='4'
                control={<Radio color='primary' />}
                label='4'
                labelPlacement='end'
              />
            </Grid>
          </RadioGroup>
          <FormHelperText>
            {error ? 'This question must be answered!' : ' '}
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};
