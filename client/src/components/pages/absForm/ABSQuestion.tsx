import {
  Grid,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  FormControlProps,
  RadioGroupProps,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import React, { FC } from 'react';
import { ABSQuestion as ABSQuestionType } from '../../../types/ABS';

type ABSQuestionProps = {
  question: ABSQuestionType;
  onChange?: RadioGroupProps['onChange'] | undefined;
  error?: FormControlProps['error'] | undefined;
};

const mobile_screen_media_query = '@media only screen and (max-width:600px)';
const useStyles = makeStyles(() =>
  createStyles({
    options: {
      display: 'flex',
      flexDirection: 'row',
      [mobile_screen_media_query]: {
        flexDirection: 'column',
      },
    },
  })
);

export const ABSQuestion: FC<ABSQuestionProps> = ({
  question,
  onChange,
  error,
}) => {
  const classes = useStyles();

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
            <Grid
              className={classes.options}
              item
              container
              direction='row'
              justify='space-between'
            >
              <FormControlLabel
                value='1'
                control={<Radio color='primary' />}
                label='1 - Absent'
                labelPlacement='end'
              />
              <FormControlLabel
                value='2'
                control={<Radio color='primary' />}
                label='2 - Slight'
                labelPlacement='end'
              />
              <FormControlLabel
                value='3'
                control={<Radio color='primary' />}
                label='3 - Moderate'
                labelPlacement='end'
              />
              <FormControlLabel
                value='4'
                control={<Radio color='primary' />}
                label='4 - Extreme'
                labelPlacement='end'
              />
            </Grid>
          </RadioGroup>
          <FormHelperText style={{ display: error ? 'block' : 'none' }}>
            {error ? 'This question must be answered!' : ' '}
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};
