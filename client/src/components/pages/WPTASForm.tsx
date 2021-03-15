import React, { FunctionComponent, useState } from 'react'
import { Box, Button, Checkbox, CssBaseline, FormControl, FormControlLabel, FormGroup, Grid, GridList, GridListTile, GridListTileBar, List, ListItem, ListItemText, Paper, Radio, Switch, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { WPTASTheme } from '../../themes';
import { DateTime } from 'luxon';


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
    },
    root: {
      position: 'relative',
    },
    root_content: {
      position: 'absolute',
      top: "5%",
      left: "5%", 
      right: "5%",
      minHeight: "90%",
      margin: "5%",
      padding: "1rem",
      zIndex: 2
    },
    root_background: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%', 
      width: '100%',
      zIndex: 1,
      background: 'blue',
      margin: 0, 
      padding: 0,
    }
  })
));

export const WPTASForm: FunctionComponent = () => {
  const classes = useStyles()

  const questions = [
    {
      title: 'How old are you?',
      correct_answer: 5,
      multi_choice: (ca => ca ? [ca-2, ca-1, ca, ca+1] : []),
    } as WPTASQuestionMarkup<number>,
    {
      title: 'What is your DOB?',
      multi_choice: (dt => ['24/05/2020', '8/11/2019', ...(dt ? [dt] : [])]),
      identifying: true,
      input_component: "date",
    } as WPTASQuestionMarkup<string>,
    /*{
      title: 'What month are we in?',
      multi_choice: (dt => ['January', 'March', 'September'].filter(m=>m!==dt).concat(dt ? [dt] : [])),
      identifying: true,
      input_component: "Select",
    } as WPTASQuestionMarkup<
      |"January"|"February"|"March"|"April"|"May"|"June"
      |"July"|"August"|"September"|"October"|"November"|"December">,
    {
      title: 'What is your DOB?',
      multi_choice: (dt => ['24/05/2020', '8/11/2019', ...(dt ? [dt] : [])]),
      identifying: true,
      input_component: "DatePicker",
    } as WPTASQuestionMarkup<string>,*/
    
  ];

  const generate_questions = generate_q_component as (question: WPTASQuestionMarkup<any>, index: number)=>JSX.Element;
  return (
    <ThemeProvider theme={WPTASTheme}>
      <CssBaseline />
      <Paper variant='outlined' className={classes.root_content}>
        {questions.map((q, index)=>generate_questions(q, index+1))}
      </Paper>
    </ThemeProvider>
  ) 
}

type WPTASInputComponent = "text" | "date" | React.Component;

type WPTASQuestionMarkup<T> = {
  title: string,
  multi_choice: MultiChoiceEval<T>,
  correct_answer?: T,
  identifying?: boolean,
  input_component?: WPTASInputComponent,
}

//const generate_q_components = <T, >(questions: (T extends WPTASQuestionMarkup<infer R> ? WPTASQuestionMarkup<R> : any)) => (
const generate_q_component = <T, >(question: WPTASQuestionMarkup<T>, index: number): JSX.Element => (
    <WPTASQuestion 
      index={index} 
      title={question.title}
      correct_answer={question.correct_answer}
      multi_choice={question.multi_choice}
      identifying={question.identifying} />
)


type MultiChoiceAnswers<T> = T[];
type MultiChoiceEval<T> = (correct_answer: T) => MultiChoiceAnswers<T>;

type Question_props<T> = {
  index: number,
  title: string,
  multi_choice: MultiChoiceEval<T>,
  identifying?: boolean,
  correct_answer?: T,
  input_component?: WPTASInputComponent,
}


const WPTASQuestion = <T, >(
  { 
    index, 
    title,
    multi_choice: multi_choice_answers, 
    identifying=false,
    correct_answer=undefined,
    input_component="text",
  }: Question_props<T>) => {
    const classes = useStyles()

    const [mc, set_multi_choice] = useState(true);
    const [mc_answers, set_mc_answers] = useState<(T | null)[]>(
      correct_answer === undefined ? [] : multi_choice_answers(correct_answer)
    );
    const [selected_mc, set_selected_mc] = useState({
      answer: null as string | null, 
      correct: null as string | null
    });

    const toggle_mc = () => set_multi_choice(!mc)
    const add_mc_answer = (answer: T | null) => set_mc_answers([...mc_answers, answer]); 
    const edit_mc_answer = (index: number, edit: T | null) => {
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

    const inputComponent = ({value, ...props}: any) => 
      input_component === "text" ? (
        <TextField 
          id={""+index} 
          label="" 
          defaultValue={value} 
          color="secondary" 
          type="text"
          multiline 
          rows={1} 
          rowsMax={4} />
      ) : input_component === "date" ? (
        <TextField 
          id={""+index} 
          label="" 
          defaultValue={value} 
          color="secondary" 
          type="date"
          multiline 
          rows={1} 
          rowsMax={4} />
      /*) : typeof input_component === React.Component ? (
        input_component*/
      ) : (
        undefined
      );

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
            {(mc_answers.length === 0 ? [null] : mc_answers).map((option, index) => (
              <ListItem>
                <Grid container direction='row'>
                  <Grid item xs={9}>
                    <Radio value={index} checked={selected_mc.answer === ""+index} onClick={select_mc} />
                    <TextField 
                      id={""+index} 
                      label="" 
                      defaultValue={option} 
                      color="secondary" 
                      type={input_component as string}
                      multiline 
                      rows={1} 
                      rowsMax={4} />
                  </Grid>
                  <Grid item xs={3}>
                    <Checkbox 
                        value={index} 
                        checked={selected_mc.correct === ""+index} 
                        onClick={select_correct_mc} />
                  </Grid>
                </Grid>
                {/*<Grid container direction='row'>
                  <Grid item xs={9}>
                    <Radio value={index} checked={selected_mc.answer === ""+index} onClick={select_mc} />
                    <TextField 
                      id={""+index} 
                      label="" 
                      defaultValue={option} 
                      color="secondary" 
                      type={text_field_type} />
                  </Grid>
                  <Grid item xs={3}>
                    <Checkbox 
                      value={index} 
                      checked={selected_mc.correct === ""+index} 
                      onClick={select_correct_mc} />
                  </Grid>
                </Grid>*/}
              </ListItem>
            ))}
            <ListItem>
              <Button className={classes.addMultiChoiceButton} onClick={_=>add_mc_answer(null)} >+ add option</Button>
            </ListItem>
        </List>
        ) : (
          <React.Fragment>
            <TextField 
              id="patient-response" 
              label="Patient Response"
              color="secondary"
              type={input_component as string} />
            {identifying && 
              <TextField 
                id="correct-answer" 
                label="Correct Answer" 
                defaultValue={correct_answer}
                color="secondary"
                type={input_component as string} />
            }
            <FormControlLabel
              control={<Checkbox />}
              label={<Typography variant="h4" color="textSecondary" >Correct?</Typography>} 
              labelPlacement="start" />
          </React.Fragment>
        )}
      </FormGroup>
    )
    
    return (
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
    )
}
