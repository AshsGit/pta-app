import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  createStyles,
  makeStyles,
  Switch,
  Theme,
  Input,
  MenuItem,
  Select,
  FormHelperText,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React, { ChangeEvent, useState } from 'react';
import { WPTASNonImageQuestion as WPTASNonImageQuestionType } from '../../../types/WPTAS';

const mobile_screen_media_query = '@media only screen and (max-width:600px)';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    questionLabel: { marginBottom: '0.5rem', fontWeight: 500 },
    question: {
      '&>*:not(:last-child)': { marginBottom: '0.5rem' },
      position: 'relative',
    },
    multiChoiceRadioGroup: {
      '&>*:not(:last-child)': { marginBottom: '1rem' },
    },
    switch: {
      flexGrow: 0,
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    correctAnswer: {
      fontWeight: 500,
    },
    answeredCorrectlyRadioGroup: {
      marginBottom: '1rem',
    },
    title: {
      flexGrow: 1,
      flexShrink: 0,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      [mobile_screen_media_query]: {
        flexDirection: 'column',
      },
    },
  })
);

export const WPTASNonImageQuestion = ({
  question,
  correctAnswerPositionOverride,
  setQuestionMultiChoiceGiven,
  setQuestionCorrect,
  getResponseOnChange,
  error_,
}: {
  question: WPTASNonImageQuestionType;
  correctAnswerPositionOverride: number;
  setQuestionMultiChoiceGiven: (
    q_index: number | Array<number> | Array<number>,
    val: boolean
  ) => void;
  setQuestionCorrect: (questoinNum: number, val: boolean) => void;
  getResponseOnChange: (
    q_index: number
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  error_: boolean;
}) => {
  const classes = useStyles();
  const { title, questionNum, correctAnswerGenerator } = question;

  // State for multiple choice mode
  const [isMultiChoice, setIsMultiChoice] = useState(false);

  // State for 'answered correctly?' question
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const answeredCorrectlyChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnsweredCorrectly((event.target as HTMLInputElement).value);
    setQuestionCorrect(questionNum, event.target.value === 'yes');
  };
  const correctAnswer = question.correctAnswerGenerator();

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='stretch'
      className={classes.question}
    >
      <Box className={classes.header}>
        <Box className={classes.title}>
          <h3 style={{ fontSize: '18px' }}>{`${questionNum}. ${title}`}</h3>
        </Box>
        <Box className={classes.switch} display='flex' alignItems='center'>
          <span style={{ fontSize: '11px' }}>Multiple choice?</span>
          <Switch
            color='primary'
            checked={isMultiChoice}
            onChange={(e) => {
              setIsMultiChoice(e.target.checked);
              setQuestionMultiChoiceGiven(questionNum, e.target.checked);
            }}
          />
        </Box>
      </Box>
      <FormControl component='fieldset' fullWidth error={error_}>
        {isMultiChoice ? (
          <WPTASMultiChoiceQuestion
            choices={question.multichoiceGenerator(
              correctAnswer,
              correctAnswerPositionOverride
            )}
            onChangeResponse={getResponseOnChange(questionNum)}
            setQuestionCorrect={(correct: boolean) =>
              setQuestionCorrect(question.questionNum, correct)
            }
            correctAnswer={correctAnswer}
          />
        ) : (
          <WPTASDefaultQuestion
            answeredCorrectly={answeredCorrectly}
            answeredCorrectlyChanged={answeredCorrectlyChanged}
            question={question}
          />
        )}
        {error_ ? (
          <FormHelperText>This question must be answered!</FormHelperText>
        ) : null}
      </FormControl>
      <div className={classes.correctAnswer}>
        {`Correct answer: ${correctAnswerGenerator()}`}
      </div>
    </Box>
  );
};

const WPTASDefaultQuestion = ({
  answeredCorrectly,
  answeredCorrectlyChanged,
  question,
}: any) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <FormControl className={classes.answeredCorrectlyRadioGroup}>
        <FormLabel className={classes.questionLabel}>
          Answered correctly?
        </FormLabel>
        <RadioGroup
          row
          aria-label='answered correctly?'
          value={answeredCorrectly}
          onChange={answeredCorrectlyChanged}
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
      <PatientResponseInput
        type={question.questionType}
        choices={'choices' in question ? question.choices : []}
      />
    </React.Fragment>
  );
};

const WPTASMultiChoiceQuestion = ({
  choices,
  onChangeResponse,
  setQuestionCorrect,
  correctAnswer,
}: {
  choices: Array<string>;
  onChangeResponse: (event: ChangeEvent<HTMLInputElement>) => void;
  setQuestionCorrect: (correct: boolean) => void;
  correctAnswer: string;
}) => {
  const [selectedMultiChoice, setSelectedMultiChoice] = useState('');
  const classes = useStyles();
  return (
    <RadioGroup
      aria-label='multiple choice'
      value={selectedMultiChoice}
      onChange={(event) => {
        setSelectedMultiChoice((event.target as HTMLInputElement).value);
        onChangeResponse(event);
        setQuestionCorrect(
          (event.target as HTMLInputElement).value === correctAnswer
        );
      }}
      className={classes.multiChoiceRadioGroup}
    >
      {choices.map((choice) => (
        <FormControlLabel
          key={choice}
          value={choice}
          control={<Radio color='primary' />}
          label={choice}
        />
      ))}
    </RadioGroup>
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
