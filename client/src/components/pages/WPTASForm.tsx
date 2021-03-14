import React, { FunctionComponent, useState } from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, GridList, GridListTile, GridListTileBar, List, ListItem, ListItemText, Paper, Radio, Switch, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { WPTASTheme } from '../../themes';


const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    form_group_row: {
      display: "inline-flex",
      justifyContent: "space-between",
      alignItems: "centre",
      "&>*": {
        margin: "auto 0"
      }
    },
    question_root: {
      padding: "1em",
      borderColor: "blue"
    },
    wrapped_radio_group: {
      display: "flex",
      flexWrap: "wrap",
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
      background: "#FFFFFF",
      border: `2px solid ${theme.palette.secondary.main}`,
      boxSizing: "border-box",
      borderRadius: "0.75em",
      fontSize: "14px",
      lineHeight: "1rem",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      textTransform: "lowercase",

      color: theme.palette.secondary.main,

    }
  })
));

export const WPTASForm: FunctionComponent = () => {
  const questions = {
    1: {
      title: 'How old are you?',
      correct_answer: 5,
      multi_choice: (ca => ca ? [ca-2, ca-1, ca, ca+1] : []) as MultiChoiceEval<number | null>,
    }
  }
  return (
    <ThemeProvider theme={WPTASTheme}>
      <Paper>
        <Question1 
          index={1} 
          title="title..." 
          multi_choice={questions[1].multi_choice} 
          correct_answer={questions[1].correct_answer} 
          mutable_correct_answer={true} />
      </Paper>
    </ThemeProvider>
  ) 
}
/*
type CorrectAnswer = undefined | string
interface WPTASQuestionProps {
  index: number,
  title: string,
  multi_choice?: undefined,
  correct_answer?: undefined | string,
  mutable_correct_answer?: boolean,
}

const WPTASQuestion: FunctionComponent<WPTASQuestionProps> = (
  { 
    index, 
    title,
    multi_choice: mc = false, 
    correct_answer = undefined,
    mutable_correct_answer: mca = false,
  }) => {
    const classes = useStyles()
    const [multi_choice, set_multi_choice] = useState(mc)
    const toggle_mc = () => set_multi_choice(!multi_choice)
    
    if (multi_choice) {
      const question_section = (
        <FormGroup>

        </FormGroup>
      )
    } else {
      const question_section = (
        <FormGroup>
          <TextField id="patient-response" label="Patient Response" />
          <TextField id="correct-answer" label="Correct Answer" />
        </FormGroup>
      )
    }
    return (
      <Paper className={classes.question_root}>
      <FormControl component="fieldset" fullWidth >
        <FormGroup row className={classes.form_group_row}>
          <Typography variant='h2'>
            {`${index}. ${title}`}
          </Typography>
          <FormControlLabel
            className={classes.multi_choice_toggle_label}
            control={<Switch checked={multi_choice} onChange={toggle_mc} />}
            label="Multiple Choice?" 
            labelPlacement="start" />
        </FormGroup>
        
        
      </FormControl>
      </Paper>
    )
}
*/
type MultiChoiceAnswers<T> = T[];
type MultiChoiceEval<T> = (correct_answer: T) => MultiChoiceAnswers<T>;

type Question_props<T> = {
  index: number,
  title: string,
  multi_choice: MultiChoiceEval<T>,
  correct_answer: T,
  mutable_correct_answer: boolean, 
}
const Question1: FunctionComponent<Question_props<number | null>> = (
  { 
    index, 
    title,
    multi_choice: multi_choice_answers, 
    correct_answer,
    mutable_correct_answer: mca,
  }) => {
    const classes = useStyles()

    const [mc, set_multi_choice] = useState(true);
    const [mc_answers, set_mc_answers] = useState(multi_choice_answers(correct_answer));
    const [selected_mc, set_selected_mc] = React.useState({
      answer: null as string | null, 
      correct: null as string | null
    });

    const toggle_mc = () => set_multi_choice(!mc)
    const add_mc_answer = (answer: number | null) => set_mc_answers([...mc_answers, answer]); 
    const edit_mc_answer = (index: number, edit: number | null) => {
      const copy = [...mc_answers];
      copy[index] = edit;
      set_mc_answers(copy)
    }
    const select_mc = (event: any) => {
      const new_val = event.target.value;
      set_selected_mc({
        ...selected_mc,
        answer: new_val === selected_mc.answer ? null : new_val,
      });
    };
    const select_correct_mc = (event: any) => {
      const new_val = event.target.value;
      set_selected_mc({
        ...selected_mc,
        correct: new_val === selected_mc.correct ? null : new_val,
      });
    };

    const question_section = (
      <FormGroup>
        {mc ? (  
          <List dense>
            <ListItem>
              <Grid container direction='row'>
                <Grid item xs={9}>
                  <Typography variant='h3' color="textSecondary">Pick patient's response</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='h3' color="textSecondary">Correct answer</Typography>
                </Grid>
              </Grid>
            </ListItem>
            {mc_answers.map((option, index) => (
              <ListItem>
                <Grid container direction='row'>
                  <Grid item xs={9}>
                    <Radio value={index} checked={selected_mc.answer === ""+index} onClick={select_mc} />
                    <TextField 
                      id={""+index} 
                      label="" 
                      defaultValue={option} 
                      color="secondary" />
                  </Grid>
                  <Grid item xs={3}>
                    <Checkbox value={index} checked={selected_mc.correct === ""+index} onClick={select_correct_mc} />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            <ListItem>
              <Button className={classes.addMultiChoiceButton} onClick={_=>add_mc_answer(null)} >+ add option</Button>
            </ListItem>
        </List>
        ) : (
          <React.Fragment>
            <TextField id="patient-response" label="Patient Response" />
            <TextField id="correct-answer" label="Correct Answer" defaultValue={correct_answer} />
          </React.Fragment>
        )}
      </FormGroup>
    )
    
    return (
      <Paper className={classes.question_root}>
      <FormControl component="fieldset" fullWidth >
        <FormGroup row className={classes.form_group_row}>
          <Typography variant='h2'>
            {`${index}. ${title}`}
          </Typography>
          <FormControlLabel
            control={<Switch checked={mc} onChange={toggle_mc} />}
            label={<Typography variant="h4" color="textSecondary" >Multiple choice?</Typography>} 
            labelPlacement="start" 
            color="textSecondary" />
        </FormGroup>
        {question_section}
      </FormControl>
      </Paper>
    )
}

