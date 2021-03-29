import React, { FunctionComponent, useState, ReactNode, FC } from 'react'
import { Box, Button, Checkbox, CssBaseline, Fab, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, GridList, GridListTile, GridListTileBar, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemText, Paper, Radio, RadioGroup, RadioGroupProps, Switch, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { ABSTheme } from '../../themes';
import { KeyboardDatePicker, KeyboardDatePickerProps, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';


export const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root_content: {
      position: 'absolute',
      top: "5%",
      left: "5%", 
      right: "5%",
      minHeight: "90%",
      margin: "5%",
      padding: "2.875rem",
      zIndex: 2,
      "&>*": {
        marginBottom: "5.625rem"
      },
      textAlign: "left"
    },
    background: {
      position: "relative",
      width: "100%",
      height: "18rem",
      top: "0",
      backgroundColor: "#F3691B",
      overflowY: "hidden",
      scrollBehavior: 'unset',
    },
    backButton: {
      position: "absolute",
      fontSize: "large",
      float: "left",
      paddingTop: "1.1rem",
      size: "large"
    },
  })
));


const Background: FunctionComponent = () => {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <Box className={classes.background} />
    </React.Fragment>
  )
}


export const ABSForm: FunctionComponent = () => {
  const classes = useStyles()

  const questions = [
    "Short attention span, easy distractibility, inability to concentrate",
    "Impulsive, impatient, low tolerance for pain or frustration",
    "Uncooperative, resistant to care, demanding",
    "Violent and or threatening violence toward people or property"
  ]; 

  const questionCount = questions.length;

  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [questionAnswers, setQuestionAnswers] = useState<string[]>(new Array(questionCount).fill(''))

  return (
    <ThemeProvider theme={ABSTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <Background />
        <Paper variant='outlined' className={classes.root_content}>
          <form>
            <Grid container direction="column" spacing={5}>
              <IconButton aria-label="back" className={classes.backButton} >
                <ArrowBackSharpIcon fontSize="large" />
              </IconButton>
              <Grid item>
                <Typography variant="h1" color="textPrimary" align="center">ABS</Typography>
              </Grid>
              <Grid item container direction="column" spacing={5} >
                <Grid item container direction="column">
                  <Typography variant="h3">Period of Observation</Typography>
                  <Grid item container direction="row" spacing={10} wrap="nowrap">
                      <Grid item xs={5}>
                        <KeyboardDatePicker
                          margin="normal"
                          id="to-date-picker-dialog"
                          format="dd/MM/yyyy"
                          value={toDate}
                          onChange={setToDate}
                          autoOk
                          okLabel={false}
                          clearable
                          InputProps={{
                            startAdornment: 
                              <InputAdornment position="start">
                                <Typography variant="h3">From:</Typography>
                              </InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <KeyboardDatePicker
                          margin="normal"
                          id="from-date-picker-dialog"
                          format="dd/MM/yyyy"
                          value={fromDate}
                          onChange={setFromDate}
                          autoOk
                          okLabel={false}
                          clearable
                          InputProps={{
                            startAdornment: 
                              <InputAdornment position="start">
                                <Typography variant="h3">To:</Typography>
                              </InputAdornment>,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                <Grid item>
                  <Typography variant="h3">Observation Environment</Typography>
                  <Input placeholder="e.g. hospital ward bed" fullWidth inputProps={{ 'aria-label': 'description' }} />
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    At the end of the observation period indicate whether the behavior described in each item was present and, if so, to what degree: slight, moderate or extreme. Use the following numerical values and criteria for your ratings.<br />
                    <br />
                    <b>1 = absent:</b> the behavior is not present. <br />
                    <b>2 = present to a slight degree:</b> the behavior is present ...<br />
                    <b>3 = present to a moderate degree:</b> the individual needs ot be redirected ...<br />
                    <b>4 = present to an extreme degree:</b> the individual is not able to engage in ...
                  </Typography>
                </Grid>
              </Grid>
              <br />
              <Grid item container spacing={10} direction="column">
                {questions.map((title, index)=> (
                  <Grid item>
                    {ABSQuestion({index: index+1, title})}
                  </Grid>))}
              </Grid>
              <Grid item container justify="flex-end">
                <Button type="submit" size="large" variant="outlined" color="primary" >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  ) 
}

type ABSQuestionProps = {
  index: number,
  title: string,
  onChange?: RadioGroupProps['onChange'] | undefined,
  onSubmit?: RadioGroupProps['onSubmit'] | undefined
}

const ABSQuestion: FC<ABSQuestionProps> = ({index, title, onChange, onSubmit}) => {
  const classes = useStyles()

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Typography variant="h2">{index}. {title}</Typography>
      </Grid>
      <Grid item>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup row onChange={onChange} onSubmit={onSubmit}>
            <Grid item container direction="row" justify="space-between">
              <FormControlLabel
                value="1"
                control={<Radio color="primary" />}
                label="1"
                labelPlacement="end"
              />
              <FormControlLabel
                value="2"
                control={<Radio color="primary" />}
                label="2"
                labelPlacement="end"
              />
              <FormControlLabel
                value="3"
                control={<Radio color="primary" />}
                label="3"
                labelPlacement="end"
              />
              <FormControlLabel
                value="4"
                control={<Radio color="primary" />}
                label="4"
                labelPlacement="end"
              />
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}