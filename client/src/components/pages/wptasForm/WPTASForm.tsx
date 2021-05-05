import React, { FunctionComponent, useState } from 'react';
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
import questions from '../../../data/wptas_questions';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { useHistory, useParams } from 'react-router-dom';

import { FilledButton } from '../../layout/Buttons';
import { WPTASQuestion } from './WPTASQuestion';

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

export const WPTASForm: FunctionComponent = () => {
  const classes = useStyles();
  const [initials, setInitials] = useState('');

  return (
    <ThemeProvider theme={WPTASTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <Background />
        <div className={classes.page}>
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
                    <WPTASQuestion
                      key={`${question.questionNum}`}
                      question={question}
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
