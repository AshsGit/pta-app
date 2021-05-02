import React, { FunctionComponent, useState } from 'react';
import {
  Box,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  GridList,
  GridListTile,
  IconButton,
  Input,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { WPTASTheme } from '../../themes';
import questions from '../../data/wptas_questions';
import {
  WPTASFaceQuestion,
  WPTASNonImageQuestion,
  WPTASPicturesQuestion,
  WPTASQuestion,
} from '../../types/WPTAS';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import CorrectIcon from '@material-ui/icons/CheckCircleTwoTone';
import IncorrectIcon from '@material-ui/icons/CancelTwoTone';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { useHistory, useParams } from 'react-router-dom';

import { FilledButton } from '../layout/Buttons';
import { face_images, photo_question_images } from '../../data/wptas_images';

const WPTAS_QUESTION_HEIGHT = '260px';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    correct: {
      color: '#4caf50',
    },
    incorrect: {
      color: '#eb4034',
    },
    form_group_row: {
      display: 'inline-flex',
      justifyContent: 'space-between',
      alignItems: 'centre',
      '&>*': {
        margin: 'auto 0',
      },
    },
    question_root: {
      padding: '1em',
      borderColor: 'blue',
    },
    wrapped_radio_group: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    gridList: {
      width: 'auto',
      height: 'fit-content',
      margin: 'auto',
      padding: 'auto',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    addMultiChoiceButton: {
      background: '#FFFFFF',
      border: `2px solid ${theme.palette.secondary.main}`,
      boxSizing: 'border-box',
      borderRadius: '0.75em',
      fontSize: '14px',
      lineHeight: '1rem',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      textTransform: 'lowercase',

      color: theme.palette.secondary.main,
    },
    root: {
      position: 'relative',
    },
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
    question: {
      '&>*:not(:last-child)': { marginBottom: '1.5rem' },
      position: 'relative',
      height: WPTAS_QUESTION_HEIGHT,
    },
    imageQuestion: {
      '&>*': { marginBottom: '1.5rem' },
      position: 'relative',
      height: 'auto',
      margin: 0,
    },
    questionLabel: { marginBottom: '0.5rem', fontWeight: 500 },
    image_wrapper: {
      position: 'relative',
      display: 'inline-flex',
    },
    image_icon_overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: '2px',
      zIndex: 1,
      width: '25px',
      height: '25px',
    },
    backButton: {
      position: 'absolute',
      left: '.5rem',
    },
    header: {
      paddingTop: '2rem',
      paddingBottom: '1rem',
    },
    switch: {
      position: 'absolute',
      right: 0,
      top: '1rem',
    },
    multiChoiceRadioGroup: {
      '&>*:not(:last-child)': { marginBottom: '1rem' },
    },
    correctAnswer: {
      fontWeight: 500,
    },
  })
);

export const WPTASForm: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={WPTASTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <Background />
        <div className='page'>
          <Paper variant='outlined' className={classes.root_content}>
            <Header />
            <Box>
              <form onSubmit={() => {}}>
                <Box
                  display='flex'
                  flexDirection='column'
                  className={classes.questionsContainer}
                >
                  {questions.map((question) => (
                    <WPTASQuestionComponent
                      key={`${question.questionNum}`}
                      question={question}
                    />
                  ))}
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

const PatientResponseInput = ({ type, choices }: any) => {
  const classes = useStyles();
  let label = (
    <FormLabel id='response-label' className={classes.questionLabel}>
      Patient Response (optional)
    </FormLabel>
  );
  const [response, setResponse] = useState(type === 'select' ? '' : null);
  const onDateResponse = (date) => {
    setResponse(date);
  };
  const onSelectResponse = (event: React.ChangeEvent<any>) => {
    setResponse(event.target.value);
  };
  switch (type) {
    case 'text':
      return (
        <FormControl style={{ maxWidth: '600px' }}>
          {label}
          <Input />
        </FormControl>
      );
    case 'date':
      return (
        <FormControl style={{ maxWidth: '300px' }}>
          {label}
          <KeyboardDatePicker
            format='dd/MM/yyyy'
            value={response}
            onChange={onDateResponse}
            // error={errors.fromDateError}
            autoOk
            okLabel={false}
            clearable
            label='Select date'
          />
        </FormControl>
      );
    case 'select':
      return (
        <FormControl style={{ maxWidth: '300px' }}>
          {label}
          <Select
            labelId='response-label'
            value={response}
            onChange={onSelectResponse}
          >
            {choices.map((choice) => (
              <MenuItem key={choice} value={choice}>
                {choice}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    default:
      return <div></div>;
  }
};

const WPTASMultiChoiceQuestion = ({ choices, correctAnswer }) => {
  const [selectedMultiChoice, setSelectedMultiChoice] = useState('');
  const classes = useStyles();
  return (
    <RadioGroup
      aria-label='multiple choice'
      value={selectedMultiChoice}
      onChange={(event) => {
        setSelectedMultiChoice((event.target as HTMLInputElement).value);
      }}
      className={classes.multiChoiceRadioGroup}
    >
      {
        // TODO replace with multiple choice generator. Expect an array of strings
        // TODO DECIDE if we generate these every time the component is rendered or once at the start when the form is initialised
        choices.map((choice) => (
          <FormControlLabel
            key={choice}
            value={choice}
            control={<Radio color='primary' />}
            label={choice}
          />
        ))
      }
    </RadioGroup>
  );
};

const WPTASQuestionComponent = ({ question }: { question: WPTASQuestion }) =>
  question.questionType === 'face_question'
    ? WPTASFaceQuestionComponent({ question })
    : question.questionType === 'pictures_question'
    ? WPTASPictureQuestionComponent({ question })
    : WPTASNonImageQuestionComponent({ question });

const WPTASFaceQuestionComponent = ({
  question,
}: {
  question: WPTASFaceQuestion;
}) => {
  const classes = useStyles();
  const { title, questionNum, image_names, correctAnswerGenerator } = question;
  const correctAnswerIndex = image_names.indexOf(correctAnswerGenerator());

  const [selectedImage, setSelectedImage] = useState('');
  const [multiChoiceGiven, setMultiChoiceGiven] = useState(false);
  const [error, setError] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const toggleShowAnswer = () => setShowAnswer(!showAnswer);

  // State for 'answered correctly?' question
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const answeredCorrectlySelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnsweredCorrectly((event.target as HTMLInputElement).value);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='stretch'
      className={classes.imageQuestion}
    >
      <Box className={classes.switch} display='flex' alignItems='center'>
        <span style={{ fontSize: '11px' }}>Multiple choice given?</span>
        <Switch
          color='primary'
          checked={multiChoiceGiven}
          onChange={() => setMultiChoiceGiven(!multiChoiceGiven)}
        />
      </Box>
      <h3 style={{ fontSize: '18px' }}>{`${questionNum}. ${title}`}</h3>
      <FormControl component='fieldset' fullWidth error={error}>
        <GridList cols={3}>
          {image_names
            .filter((_, i) => i < 3)
            .map((img_name, index) => (
              <GridListTile
                key={img_name}
                cols={1}
                className={classes.image_wrapper}
              >
                <img
                  src={face_images[img_name]}
                  onClick={(_) => setSelectedImage(`${index}`)}
                  style={
                    showAnswer && selectedImage !== `${index}`
                      ? { opacity: 0.4 }
                      : {}
                  }
                />
                {showAnswer ? (
                  correctAnswerIndex === index ? (
                    <CorrectIcon
                      className={`${classes.image_icon_overlay} ${classes.correct}`}
                    />
                  ) : selectedImage === `${index}` ? (
                    <IncorrectIcon
                      className={`${classes.image_icon_overlay} ${classes.incorrect}`}
                    />
                  ) : null
                ) : null}
              </GridListTile>
            ))}
        </GridList>
        <RadioGroup
          aria-label='multiple choice'
          value={selectedImage}
          row
          onChange={(event) => {
            setSelectedImage((event.target as HTMLInputElement).value);
          }}
        >
          <Grid container direction='row' justify='space-around'>
            <Grid item>
              <Radio
                color='primary'
                checked={selectedImage === '0'}
                value='0'
              />
            </Grid>
            <Grid item>
              <Radio
                color='primary'
                checked={selectedImage === '1'}
                value='1'
              />
            </Grid>
            <Grid item>
              <Radio
                color='primary'
                checked={selectedImage === '2'}
                value='2'
              />
            </Grid>
          </Grid>
        </RadioGroup>
        {error ? (
          <FormHelperText>This question must be answered!</FormHelperText>
        ) : null}
        <Grid container justify='flex-end'>
          <FilledButton fullWidth={false} onClick={toggleShowAnswer}>
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </FilledButton>
        </Grid>
      </FormControl>
    </Box>
  );
};

const WPTASPictureQuestionComponent = ({
  question,
}: {
  question: WPTASPicturesQuestion;
}) => {
  const classes = useStyles();
  const { title, questionNum, image_names, correctAnswerGenerator } = question;
  const correctAnswerCoords = correctAnswerGenerator()
    .map((img_name) => image_names.findIndex((v) => v === img_name))
    .map((index) => [index % 3, (index / 3) >> 0]);

  const [selected, setSelected] = useState({
    total: 0,
    arr: [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  });

  const [error, setError] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isMultiChoice, setIsMultiChoice] = useState(false);

  // State for 'answered correctly?' question
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const answeredCorrectlySelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnsweredCorrectly((event.target as HTMLInputElement).value);
  };

  const rows = image_names
    .filter((_, i) => i < 9)
    .reduce((list, img_name, index) => {
      if (index % 3 === 0) return [...list, [img_name]];
      else {
        let tmp = [...list];
        tmp[tmp.length - 1].push(img_name);
        return tmp;
      }
    }, []);

  const onClickImage = (x: number, y: number) => (_) => {
    if (selected.total < 3 || selected.arr[x][y] === true) {
      const total = selected.total + (selected.arr[x][y] === true ? -1 : 1);
      const arr = [...selected.arr];
      arr[x] = [...arr[x]];
      arr[x][y] = !arr[x][y];
      setSelected({
        total,
        arr,
      });
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='stretch'
      className={classes.imageQuestion}
    >
      <Box className={classes.switch} display='flex' alignItems='center'>
        <span style={{ fontSize: '11px' }}>Multiple choice given?</span>
        <Switch
          color='primary'
          checked={isMultiChoice}
          onChange={() => setIsMultiChoice(!isMultiChoice)}
        />
      </Box>
      <h3 style={{ fontSize: '18px' }}>{`${questionNum}. ${title}`}</h3>
      <FormControl component='fieldset' fullWidth error={error}>
        <Grid container direction='column' justify='space-between' spacing={3}>
          {rows.map((row, y) => (
            <Grid container item xs direction='row' justify='space-around'>
              {row.map((img_name, x) => (
                <Grid item xs style={{ flexGrow: 0 }}>
                  <img
                    src={photo_question_images[img_name]}
                    onClick={onClickImage(x, y)}
                    width={150}
                    height={190}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </FormControl>
    </Box>
  );
};

const WPTASNonImageQuestionComponent = ({
  question,
}: {
  question: WPTASNonImageQuestion;
}) => {
  const classes = useStyles();
  const { title, questionNum, questionType, choices } = question;

  const [isMultiChoice, setIsMultiChoice] = useState(false);

  // State for 'answered correctly?' question
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const answeredCorrectlySelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnsweredCorrectly((event.target as HTMLInputElement).value);
  };
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='stretch'
      className={classes.question}
    >
      <Box className={classes.switch} display='flex' alignItems='center'>
        <span style={{ fontSize: '11px' }}>Multiple choice?</span>
        <Switch
          color='primary'
          checked={isMultiChoice}
          onChange={() => setIsMultiChoice(!isMultiChoice)}
        />
      </Box>
      <h3 style={{ fontSize: '18px' }}>{`${questionNum}. ${title}`}</h3>
      {isMultiChoice ? (
        <WPTASMultiChoiceQuestion
          choices={question.multichoiceGenerator(
            question.correctAnswerGenerator()
          )}
          correctAnswer={question.correctAnswerGenerator()}
        />
      ) : (
        <React.Fragment>
          <FormControl>
            <FormLabel className={classes.questionLabel}>
              Answered correctly?
            </FormLabel>
            <RadioGroup
              row
              aria-label='answered correctly?'
              value={answeredCorrectly}
              onChange={answeredCorrectlySelected}
            >
              <Box flexGrow='1' display='flex' flexDirection='row'>
                <Box flex='1 1 50%'>
                  <FormControlLabel
                    value='yes'
                    control={<Radio color='primary' />}
                    label='Yes'
                  />
                </Box>
                <Box flex='1 1 50%'>
                  <FormControlLabel
                    value='no'
                    control={<Radio color='primary' />}
                    label='No'
                  />
                </Box>
              </Box>
            </RadioGroup>
          </FormControl>
          <PatientResponseInput type={questionType} choices={choices || []} />
        </React.Fragment>
      )}
      <div
        className={classes.correctAnswer}
      >{`Correct answer: ${question.correctAnswerGenerator()}`}</div>
    </Box>
  );
};
