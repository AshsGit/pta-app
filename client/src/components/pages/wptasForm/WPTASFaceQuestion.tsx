import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  FormControl,
  GridList,
  GridListTile,
  RadioGroup,
  Grid,
  Switch,
  Radio,
  FormHelperText,
} from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { face_images } from '../../../data/wptas_images';
import { WPTASFaceQuestion as WPTASFaceQuestionType } from '../../../types/WPTAS';
import { FilledButton } from '../../layout/Buttons';
import CorrectIcon from '@material-ui/icons/CheckCircleTwoTone';
import IncorrectIcon from '@material-ui/icons/CancelTwoTone';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    switch: {
      position: 'absolute',
      right: 0,
      top: '1rem',
    },
    imageQuestion: {
      '&>*': { marginBottom: '1.5rem' },
      position: 'relative',
      height: 'auto',
      margin: 0,
    },
    image_wrapper: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
    },
    image_icon_overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: '3px',
      zIndex: 1,
      width: '25px',
      height: '25px',
    },
    correct: {
      color: '#4caf50',
      fontSize: 40,
    },
    incorrect: {
      color: '#eb4034',
      fontSize: 40,
    },
    disabledSwitch: {
      '& .MuiSwitch-colorPrimary.Mui-disabled': {
        color: '#5c88f6',
      },
      '& .MuiSwitch-track': {
        backgroundColor: '#5c88f6 !important',
        opacity: '0.5 !important',
      },
    },
  })
);

export const WPTASFaceQuestion = ({
  question,
  setQuestionMultiChoiceGiven,
  setQuestionCorrect,
  getResponseOnChange,
}: {
  question: WPTASFaceQuestionType;
  setQuestionMultiChoiceGiven: (
    q_index: number | Array<number>,
    val: boolean
  ) => void;
  setQuestionCorrect: (
    questoinNum: number | Array<number>,
    val: boolean
  ) => void;
  getResponseOnChange: (
    q_index: number
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const classes = useStyles();
  const { title, questionNum, image_names, correctAnswerGenerator } = question;
  const correctAnswerIndex = image_names.indexOf(correctAnswerGenerator());

  const [selectedImage, setSelectedImage] = useState('');
  // Default this question to true, as it is always a multiple choice question.
  const [multiChoiceGiven, setMultiChoiceGiven] = useState(true);
  const [error, setError] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const toggleShowAnswer = () => setShowAnswer(!showAnswer);

  const onChangeResponse = getResponseOnChange(questionNum);

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
          className={classes.disabledSwitch}
          color='primary'
          checked={multiChoiceGiven}
          disabled={true} // This question is always a multiple choice question.
          onChange={(e) => {
            setMultiChoiceGiven(e.target.checked);
            setQuestionMultiChoiceGiven(questionNum, e.target.checked);
          }}
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
            onChangeResponse(event);
            setQuestionCorrect(
              questionNum,
              event.target.value === correctAnswerIndex.toString()
            );
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
