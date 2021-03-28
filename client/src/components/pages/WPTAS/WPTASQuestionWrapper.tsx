import React, { useState, ReactNode } from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, List, ListItem, Radio, Switch, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export type WPTASQuestionProps<T> = {
  index: number,
  title: string,
  multi_choice: (correct_answer?: T) => T[],
  correct_answer?: T,
  given_answer_component: ReactNode | null,
  correct_answer_component: ReactNode | null,
  multi_choice_option_component: (index: number, value: T) => ReactNode,
  new_multi_choice: T,
}

type SemiPartial<T, K extends keyof T> = Omit<T, K> & Partial<{ [Q in K]: T[Q]; }>;

export type WPTASQuestionType<T, O extends keyof WPTASQuestionProps<T>> = 
  (props: SemiPartial<WPTASQuestionProps<T>, O>) => ReturnType<typeof WPTASQuestion>;

/*export type WPTASQuestionType<T, O extends string | number | symbol> = 
  (props: Optional<WPTASQuestionProps<T>, O>) => ReturnType<typeof WPTASQuestion>;*/


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
    formControlLabel: {
      paddingLeft: "1.5625rem",
      paddingRight: "1.5625rem",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "1.125rem",
      lineHeight: "1.3125rem",
    },
    
  })
));


export const WPTASQuestion = <T, >(
  { 
    index, 
    title,
    multi_choice: multi_choice_answers, 
    correct_answer,
    given_answer_component,
    correct_answer_component,
    multi_choice_option_component,
    new_multi_choice,
  }: WPTASQuestionProps<T>): ReactNode => {
    
    const classes = useStyles()

    const [mc, set_multi_choice] = useState(()=>false);
    const [mc_answers, set_mc_answers] = useState<(T)[]>(
      correct_answer === undefined ? [] : multi_choice_answers(correct_answer)
    );
    const [selected_mc, set_selected_mc] = useState({
      answer: null as string | null, 
      correct: null as string | null
    });

    const toggle_mc = () => set_multi_choice(!mc)
    const add_mc_answer = (answer: T) => set_mc_answers([...mc_answers, answer]); 

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
                            {multi_choice_option_component(index, option)}
                        </Grid>
                        <Grid item xs={3}>
                            <Checkbox 
                                value={index} 
                                checked={selected_mc.correct === ""+index} 
                                onClick={select_correct_mc} />
                        </Grid>
                    </Grid>
                  </ListItem>
                ))}
                <ListItem>
                <Button className={classes.addMultiChoiceButton} onClick={_=>add_mc_answer(new_multi_choice)} >+ add option</Button>
                </ListItem>
            </List>
            ) : (
            <React.Fragment>
                {given_answer_component}
                <br />
                {correct_answer_component}
                <br />
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography className={classes.formControlLabel} variant="h3" color="textSecondary" >Answered correctly?</Typography>} 
                    labelPlacement="end" />
            </React.Fragment>
            )}
        </FormGroup>
      </FormControl>
    )
}
