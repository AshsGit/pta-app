import React, { FunctionComponent, useState } from 'react'
import { Box, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Paper, Switch, TextField, Typography } from '@material-ui/core';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import ErrorBoundary from '../error_handling';
import { WPTASTheme } from '../../themes';


const useStyles = makeStyles(theme => ({
  root: {
    background: 'grey',
    border: 0,
    borderRadius: 0.5,
    color: 'white',
    padding: 5,
    margin: "2em 2em 2em 2em",
  },
  h1: {
    position: "absolute",
    left: "0%",
    top: "0%",

    display: "flex",
    alignItems: "center",

    color: "#000000",
  },
  multi_choice_toggle_label: {
    position: "absolute",
    left: "77.49%",
    right: "0%",
    top: "0%",
    bottom: "82.17%",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "16px",
    display: "flex",
    alignItems: "center",

    color: "#636363",
  }
}));

export const WPTASForm: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={WPTASTheme}>
      <Paper>
        <WPTASQuestion multi_choice index={1} title="title..." />
      </Paper>
    </ThemeProvider>
  ) 
}

interface WPTASQuestionProps {
    multi_choice: boolean,
    index: number,
    title: string
}

const WPTASQuestion: FunctionComponent<WPTASQuestionProps> = ({ multi_choice: mc, index, title }) => {
    const classes = useStyles({})
    const [multi_choice, set_multi_choice] = useState(mc)
    const toggle_mc = () => set_multi_choice(!multi_choice)
    
    return (
      <FormControl component="fieldset" fullWidth>
        <Typography variant='h1' gutterBottom>
          {`${index}. ${title}`}
        </Typography>
        <FormControlLabel
          className={classes.multi_choice_toggle_label}
          control={<Switch checked={multi_choice} onChange={toggle_mc} />}
          label="Multiple Choice?" />
      </FormControl>
    )
}


