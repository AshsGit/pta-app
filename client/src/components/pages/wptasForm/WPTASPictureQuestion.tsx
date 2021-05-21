import {
  GridList,
  GridListTile,
  Box,
  FormControl,
  Grid,
  FormHelperText,
  Switch,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { photo_question_images } from '../../../data/wptas_images';
import { WPTASPicturesQuestion } from '../../../types/WPTAS';
import { FilledButton } from '../../layout/Buttons';
import CorrectIcon from '@material-ui/icons/CheckCircleTwoTone';
import IncorrectIcon from '@material-ui/icons/CancelTwoTone';
import { question_count } from '../../../data/wptas_questions';

const mobile_screen_media_query = '@media only screen and (max-width:600px)';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    switch: {
      flexGrow: 0,
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'flex-end',
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
    selectedPic: {
      borderWidth: '5px',
      borderStyle: 'solid',
      borderColor: theme.palette.primary.main,
    },
    correct: {
      color: '#4caf50',
      fontSize: 40,
    },
    incorrect: {
      color: '#eb4034',
      fontSize: 40,
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      [mobile_screen_media_query]: {
        flexDirection: 'column',
      },
    },
    title: {
      flexGrow: 1,
      flexShrink: 0,
    },
  })
);

export const WPTASPictureQuestion = ({
  question,
  setQuestionMultiChoiceGiven,
  setQuestionCorrect,
  error_,
}: {
  question: WPTASPicturesQuestion;
  setQuestionMultiChoiceGiven: (
    q_index: number | Array<number>,
    val: boolean
  ) => void;
  setQuestionCorrect: (
    q_index: number | Array<number>,
    val: boolean | Array<boolean>
  ) => void;
  getResponseOnChange: (
    q_index: number
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  error_: boolean;
}) => {
  const classes = useStyles();
  const {
    title,
    questionNum,
    image_names,
    correctAnswerGenerator,
    newPics,
  } = question;

  const correctAnswers = correctAnswerGenerator();

  const correctAnswerCoords = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];
  const correctCoordQuestionNum = Array(question_count).fill('');

  correctAnswers
    .map((img_name) => image_names.findIndex((v) => v === img_name))
    .map((index) => [index % 3, (index / 3) >> 0])
    .forEach(([x, y], index) => {
      correctAnswerCoords[x][y] = true;
      correctCoordQuestionNum[index] = `${x} ${y}`;
    });

  const [selected, setSelected] = useState({
    total: 0,
    correct: 0,
    arr: [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  });

  const [showAnswer, setShowAnswer] = useState(false);
  const toggleShowAnswer = () => setShowAnswer(!showAnswer);
  const [showTomorrowsPics, setShowTomorrowsPics] = useState(false);
  const toggleShowTomorrowsPics = () =>
    setShowTomorrowsPics(!showTomorrowsPics);
  const [isMultiChoice, setIsMultiChoice] = useState(false);

  const multiChoiceToggle = (e) => {
    setIsMultiChoice(e.target.checked);
    setQuestionMultiChoiceGiven(questionNum, e.target.checked);
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
      const correct = correctAnswerCoords[x][y]
        ? selected.correct + (selected.arr[x][y] ? -1 : 1)
        : selected.correct;
      const arr = [...selected.arr];
      arr[x] = [...arr[x]];
      arr[x][y] = !arr[x][y];
      setSelected({
        total,
        correct,
        arr,
      });

      var setQuestionCorrectVals;

      switch (correct) {
        case 0:
          setQuestionCorrectVals = [false, false, false];
          break;
        case 1:
          setQuestionCorrectVals = [true, false, false];
          break;
        case 2:
          setQuestionCorrectVals = [true, true, false];
          break;
        case 3:
          setQuestionCorrectVals = [true, true, true];
          break;
      }

      switch (total) {
        case 0:
          setQuestionCorrectVals = [null, null, null];
          break;
        case 1:
          setQuestionCorrectVals[1] = null;
          setQuestionCorrectVals[2] = null;
          break;
        case 2:
          setQuestionCorrectVals[2] = null;
          break;
        case 3:
          break;
      }

      setQuestionCorrect(questionNum, setQuestionCorrectVals);
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='stretch'
      className={classes.imageQuestion}
    >
      <Box className={classes.header}>
        <Box className={classes.title}>
          <h3 style={{ fontSize: '18px' }}>{`${questionNum}. ${title}`}</h3>
        </Box>
        <Box className={classes.switch} display='flex' alignItems='center'>
          <span style={{ fontSize: '11px' }}>Multiple choice given?</span>
          <Switch
            color='primary'
            checked={isMultiChoice}
            onChange={multiChoiceToggle}
          />
        </Box>
      </Box>
      <span>Tell me the pictures you were shown yesterday.</span>
      <FormControl component='fieldset' fullWidth error={error_}>
        {showTomorrowsPics ? (
          <WPTASNextWeekPics
            nextWeeksQuestions={
              selected.correct === 3 ? newPics(correctAnswers) : correctAnswers
            }
          />
        ) : (
          <React.Fragment>
            <Grid
              container
              direction='column'
              justify='space-between'
              spacing={3}
            >
              {rows.map((row, y) => (
                <Grid
                  key={y}
                  container
                  item
                  xs
                  direction='row'
                  justify='space-around'
                >
                  {row.map((img_name, x) => (
                    <Grid
                      key={x}
                      item
                      xs
                      style={{ flexGrow: 0 }}
                      className={`${classes.image_wrapper} ${
                        selected.arr[x][y] ? classes.selectedPic : ''
                      }`}
                    >
                      <img
                        src={photo_question_images[img_name]}
                        onClick={onClickImage(x, y)}
                        width={150}
                        height={190}
                        style={
                          showAnswer && !selected.arr[x][y]
                            ? { opacity: 0.5 }
                            : {}
                        }
                        alt={`${img_name}`}
                      />
                      {showAnswer ? (
                        correctAnswerCoords[x][y] ? (
                          <CorrectIcon
                            className={`${classes.image_icon_overlay} ${classes.correct}`}
                          />
                        ) : selected.arr[x][y] ? (
                          <IncorrectIcon
                            className={`${classes.image_icon_overlay} ${classes.incorrect}`}
                          />
                        ) : null
                      ) : null}
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
            {error_ ? (
              <FormHelperText>This question must be answered!</FormHelperText>
            ) : null}
          </React.Fragment>
        )}
        <Box marginTop='1.5rem'>
          {showAnswer && showTomorrowsPics && (
            <Box
              style={{ position: 'absolute', left: 0 }}
              display='flex'
              alignItems='center'
            >
              <FilledButton
                fullWidth={false}
                onClick={() => {
                  toggleShowTomorrowsPics();
                }}
              >
                {'< Change Selections'}
              </FilledButton>
            </Box>
          )}
          {showAnswer && !showTomorrowsPics && (
            <Box
              style={{ position: 'absolute', left: 0 }}
              display='flex'
              alignItems='center'
            >
              <FilledButton fullWidth={false} onClick={toggleShowAnswer}>
                {'< Hide Answers'}
              </FilledButton>
            </Box>
          )}
          {showAnswer && !showTomorrowsPics && (
            <Box
              style={{ position: 'absolute', right: 0 }}
              display='flex'
              alignItems='center'
            >
              <FilledButton
                fullWidth={false}
                disabled={selected.total === 3 ? false : true}
                onClick={toggleShowTomorrowsPics}
              >
                {'Tomorrows Pictures >'}
              </FilledButton>
            </Box>
          )}
          {!showAnswer && !showTomorrowsPics && (
            <Box
              style={{ position: 'absolute', right: 0 }}
              display='flex'
              alignItems='center'
            >
              <FilledButton fullWidth={false} onClick={toggleShowAnswer}>
                {'Show Answers >'}
              </FilledButton>
            </Box>
          )}
        </Box>
      </FormControl>
    </Box>
  );
};

const WPTASNextWeekPics = ({ nextWeeksQuestions }) => {
  const classes = useStyles();
  return (
    <GridList cols={3}>
      {nextWeeksQuestions.map((img_name, index) => (
        <GridListTile key={img_name} cols={1} className={classes.image_wrapper}>
          <img src={photo_question_images[img_name]} alt={`${img_name}`} />
        </GridListTile>
      ))}
    </GridList>
  );
};
