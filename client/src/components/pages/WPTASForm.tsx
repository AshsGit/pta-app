import React, { FunctionComponent, useState } from 'react';
import {
  Box,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
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
import Image from 'material-ui-image';
import {
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { WPTASTheme } from '../../themes';
import questions from '../../data/wptas';
import { WPTASImageQuestion, WPTASNonImageQuestion, WPTASQuestion } from '../../types/WPTAS';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      // position: 'absolute',
      // top: '5%',
      // left: '5%',
      // right: '5%',
      // minHeight: '90%',
      // margin: '5%',
      // padding: '1rem',
      // zIndex: 2,
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
      height: '230px',
    },
    questionLabel: { marginBottom: '0.5rem', fontWeight: 500 },
    backButton: {
      position: 'absolute',
      // top: '1rem',
      left: '.5rem',
      // fontSize: 'large',
      // float: 'left',
      // paddingTop: '1.1rem',
    },
    header: {
      // position: 'absolute',
      // top: 0,
      // height: '60px',
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
                  {questions
                    .map((question) => (
                      <WPTASQuestionComponent
                        key={question.questionNum}
                        question={question}
                      />
                    ))}
                </Box>
              </form>
            </Box>
            {
              // questions.map()
            }
            {/* {questions.map((q, index) => generate_questions(q, index + 1))} */}
          </Paper>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

const Header: FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box display='flex' className={classes.header} alignItems='center'>
      <IconButton
        aria-label='back'
        className={classes.backButton}
        onClick={() => history.goBack()}
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

const WPTASMultiChoiceQuestion = () => {
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
        ['option 1', 'option 2', 'option 3'].map((choice) => (
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

const WPTASQuestionComponent = ({ question }: { question: WPTASQuestion }) => question.questionType === 'image' 
  ? WPTASImageQuestionComponent({ question })
  : WPTASNonImageQuestionComponent({ question });


const WPTASImageQuestionComponent = ({ question }: { question: WPTASImageQuestion }) => {
  const classes = useStyles();
  const { title, questionNum, image_names, dimensions, correctAnswerGenerator } = question;

  const [selectedMultiChoice, setSelectedMultiChoice] = useState('');
  const [error, setError] = useState(false);

  /*const rows: string[][] = image_names.reduce((list, img_name, index) => {
    if (index % 3 === 0) 
      return [...list, [img_name]];
    else
      const tmp = [...list];
      tmp[tmp.length-1].push(img_name);
      return tmp;
    }, []);*/

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
      <h3 style={{ fontSize: '18px' }}>{`${questionNum}. ${title}`}</h3>
      <FormControl component='fieldset' fullWidth error={error}>
        <RadioGroup 
          aria-label='multiple choice'
          className={classes.multiChoiceRadioGroup}
          value={selectedMultiChoice}
          row 
          onChange={(event) => {
            setSelectedMultiChoice((event.target as HTMLInputElement).value);
          }}
        >
          <Grid container direction='row' justify='space-between'>
            {image_names.filter((_, i) => i < 3).map((img_name, index) => (
              <FormControlLabel
                key={img_name}
                value={index}
                control={<Radio color='primary' />}
                label={
                  <Image
                    src=''
                    aspectRatio={(16/9)}
                  />
                  /*
                  //IMG Goes here...
                  <div>
                    <h1>This is a test component</h1> 
                    <h2>This is a second test</h2>
                  </div>*/
                }
                labelPlacement='top'
              />
            ))}
          </Grid>
        </RadioGroup>
        <FormHelperText>
          {error ? 'This question must be answered!' : ' '}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

const WPTASNonImageQuestionComponent = ({ question }: { question: WPTASNonImageQuestion }) => {

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
        <WPTASMultiChoiceQuestion />
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
      {/* {renderPatientResponseInput(questionType)} */}
    </Box>
  );
};
