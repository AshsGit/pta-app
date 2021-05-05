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
} from '@material-ui/core';
import React, { FC } from 'react';
import { ABSQuestion as ABSQuestionType } from '../../../types/ABS';

type ABSQuestionProps = {
  question: ABSQuestionType;
  onChange?: RadioGroupProps['onChange'] | undefined;
  error?: FormControlProps['error'] | undefined;
};

export const ABSQuestion: FC<ABSQuestionProps> = ({
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
