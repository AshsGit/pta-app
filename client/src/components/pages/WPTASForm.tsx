import React, { FunctionComponent, useState } from 'react';
import {
  Box,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { WPTASTheme } from '../../themes';
import questions from '../../data/wptas';
import { WPTASQuestion } from '../../types/WPTAS';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form_group_row: {
      display: 'inline-flex',
      justifyContent: 'space-between',
      alignItems: 'centre',
      '&>*': {
        margin: 'auto 0',
      },
    },
    question_root: {
      padding: '1em',
      borderColor: 'blue',
    },
    wrapped_radio_group: {
      display: 'flex',
      flexWrap: 'wrap',
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
      background: '#FFFFFF',
      border: `2px solid ${theme.palette.secondary.main}`,
      boxSizing: 'border-box',
      borderRadius: '0.75em',
      fontSize: '14px',
      lineHeight: '1rem',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      textTransform: 'lowercase',

      color: theme.palette.secondary.main,
    },
    root: {
      position: 'relative',
    },
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
    question: {
      '&>*:not(:last-child)': { marginBottom: '1.5rem' },
      position: 'relative',
      height: '230px',
    },
    questionLabel: { marginBottom: '0.5rem', fontWeight: 500 },
    backButton: {
      position: 'absolute',
      left: '.5rem',
    },
    header: {
      paddingTop: '2rem',
      paddingBottom: '1rem',
    },
    switch: {
      position: 'absolute',
      right: 0,
      top: '1rem',
    },
    multiChoiceRadioGroup: {
      '&>*:not(:last-child)': { marginBottom: '1rem' },
    },
  })
);

export const WPTASForm: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={WPTASTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <Background />
        <div className='page'>
          <Paper variant='outlined' className={classes.root_content}>
            <Header />
            <Box>
              <form onSubmit={() => {}}>
                <Box
                  display='flex'
                  flexDirection='column'
                  className={classes.questionsContainer}
                >
                  {questions
                    .filter((_, i) => i < 7)
                    .map((question) => (
                      <WPTASQuestionComponent
                        key={question.questionNum}
                        question={question}
                      />
                    ))}
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

const PatientResponseInput = ({ type, choices }: any) => {
  const classes = useStyles();
  let label = (
    <FormLabel id='response-label' className={classes.questionLabel}>
      Patient Response (optional)
    </FormLabel>
  );
  const [response, setResponse] = useState(type === 'select' ? '' : null);
  const onDateResponse = (date) => {
    setResponse(date);
  };
  const onSelectResponse = (event: React.ChangeEvent<any>) => {
    setResponse(event.target.value);
  };
  switch (type) {
    case 'text':
      return (
        <FormControl style={{ maxWidth: '600px' }}>
          {label}
          <Input />
        </FormControl>
      );
    case 'date':
      return (
        <FormControl style={{ maxWidth: '300px' }}>
          {label}
          <KeyboardDatePicker
            format='dd/MM/yyyy'
            value={response}
            onChange={onDateResponse}
            // error={errors.fromDateError}
            autoOk
            okLabel={false}
            clearable
            label='Select date'
          />
        </FormControl>
      );
    case 'select':
      return (
        <FormControl style={{ maxWidth: '300px' }}>
          {label}
          <Select
            labelId='response-label'
            value={response}
            onChange={onSelectResponse}
          >
            {choices.map((choice) => (
              <MenuItem key={choice} value={choice}>
                {choice}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    default:
      return <div></div>;
  }
};

const WPTASMultiChoiceQuestion = () => {
  const [selectedMultiChoice, setSelectedMultiChoice] = useState('');
  const classes = useStyles();
  return (
    <RadioGroup
      aria-label='multiple choice'
      value={selectedMultiChoice}
      onChange={(event) => {
        setSelectedMultiChoice((event.target as HTMLInputElement).value);
      }}
      className={classes.multiChoiceRadioGroup}
    >
      {
        // TODO replace with multiple choice generator. Expect an array of strings
        // TODO DECIDE if we generate these every time the component is rendered or once at the start when the form is initialised
        ['option 1', 'option 2', 'option 3'].map((choice) => (
          <FormControlLabel
            key={choice}
            value={choice}
            control={<Radio color='primary' />}
            label={choice}
          />
        ))
      }
    </RadioGroup>
  );
};

const WPTASQuestionComponent = ({ question }: { question: WPTASQuestion }) => {
  const classes = useStyles();
  const { title, questionNum, questionType, choices } = question;

  const [isMultiChoice, setIsMultiChoice] = useState(false);

  // State for 'answered correctly?' question
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const answeredCorrectlySelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnsweredCorrectly((event.target as HTMLInputElement).value);
  };
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='stretch'
      className={classes.question}
    >
      <Box className={classes.switch} display='flex' alignItems='center'>
        <span style={{ fontSize: '11px' }}>Multiple choice?</span>
        <Switch
          color='primary'
          checked={isMultiChoice}
          onChange={() => setIsMultiChoice(!isMultiChoice)}
        />
      </Box>
      <h3 style={{ fontSize: '18px' }}>{`${questionNum}. ${title}`}</h3>
      {isMultiChoice ? (
        <WPTASMultiChoiceQuestion />
      ) : (
        <React.Fragment>
          <FormControl>
            <FormLabel className={classes.questionLabel}>
              Answered correctly?
            </FormLabel>
            <RadioGroup
              row
              aria-label='answered correctly?'
              value={answeredCorrectly}
              onChange={answeredCorrectlySelected}
            >
              <Box flexGrow='1' display='flex' flexDirection='row'>
                <Box flex='1 1 50%'>
                  <FormControlLabel
                    value='yes'
                    control={<Radio color='primary' />}
                    label='Yes'
                  />
                </Box>
                <Box flex='1 1 50%'>
                  <FormControlLabel
                    value='no'
                    control={<Radio color='primary' />}
                    label='No'
                  />
                </Box>
              </Box>
            </RadioGroup>
          </FormControl>
          <PatientResponseInput type={questionType} choices={choices || []} />
        </React.Fragment>
      )}
    </Box>
  );
};

// type WPTASInputComponent = 'text' | 'date' | React.Component;

// type WPTASQuestionMarkup<T> = {
//   title: string;
//   multi_choice: MultiChoiceEval<T>;
//   correct_answer?: T;
//   identifying?: boolean;
//   input_component?: WPTASInputComponent;
// };

// //const generate_q_components = <T, >(questions: (T extends WPTASQuestionMarkup<infer R> ? WPTASQuestionMarkup<R> : any)) => (
// const generate_q_component = <T,>(
//   question: WPTASQuestionMarkup<T>,
//   index: number
// ): JSX.Element => (
//   <WPTASQuestion
//     index={index}
//     title={question.title}
//     correct_answer={question.correct_answer}
//     multi_choice={question.multi_choice}
//     identifying={question.identifying}
//   />
// );

// type MultiChoiceAnswers<T> = T[];
// type MultiChoiceEval<T> = (correct_answer: T) => MultiChoiceAnswers<T>;

// type Question_props<T> = {
//   index: number;
//   title: string;
//   multi_choice: MultiChoiceEval<T>;
//   identifying?: boolean;
//   correct_answer?: T;
//   input_component?: WPTASInputComponent;
// };

// const WPTASQuestion1 = <T,>({
//   index,
//   title,
//   multi_choice: multi_choice_answers,
//   identifying = false,
//   correct_answer = undefined,
//   input_component = 'text',
// }: Question_props<T>) => {
//   const classes = useStyles();

//   const [mc, set_multi_choice] = useState(false);
//   const [mc_answers, set_mc_answers] = useState<(T | null)[]>(
//     correct_answer === undefined ? [] : multi_choice_answers(correct_answer)
//   );
//   const [selected_mc, set_selected_mc] = useState({
//     answer: null as string | null,
//     correct: null as string | null,
//   });

//   const toggle_mc = () => set_multi_choice(!mc);
//   const add_mc_answer = (answer: T | null) =>
//     set_mc_answers([...mc_answers, answer]);
//   const edit_mc_answer = (index: number, edit: T | null) => {
//     const copy = [...mc_answers];
//     copy[index] = edit;
//     set_mc_answers(copy);
//   };
//   const select_mc = (event: any) => {
//     const new_val = event.target.value;
//     set_selected_mc({
//       ...selected_mc,
//       answer: new_val === selected_mc.answer ? null : new_val,
//     });
//   };
//   const select_correct_mc = (event: any) => {
//     const new_val = event.target.value;
//     set_selected_mc({
//       ...selected_mc,
//       correct: new_val === selected_mc.correct ? null : new_val,
//     });
//   };

//   const inputComponent = ({ value, ...props }: any) =>
//     input_component === 'text' ? (
//       <TextField
//         id={'' + index}
//         label=''
//         defaultValue={value}
//         color='secondary'
//         type='text'
//         multiline
//         rows={1}
//         rowsMax={4}
//       />
//     ) : input_component === 'date' ? (
//       <TextField
//         id={'' + index}
//         label=''
//         defaultValue={value}
//         color='secondary'
//         type='date'
//         multiline
//         rows={1}
//         rowsMax={4}
//       />
//     ) : undefined;

//   const question_section = (
//     <FormGroup>
//       {mc ? (
//         <List dense>
//           <ListItem>
//             <Grid container direction='row'>
//               <Grid item xs={9}>
//                 <Typography variant='h3' color='textSecondary'>
//                   Pick patient's response
//                 </Typography>
//               </Grid>
//               <Grid item xs={3}>
//                 <Typography variant='h3' color='textSecondary'>
//                   Correct answer
//                 </Typography>
//               </Grid>
//             </Grid>
//           </ListItem>
//           {(mc_answers.length === 0 ? [null] : mc_answers).map(
//             (option, index) => (
//               <ListItem>
//                 <Grid container direction='row'>
//                   <Grid item xs={9}>
//                     <Radio
//                       value={index}
//                       checked={selected_mc.answer === '' + index}
//                       onClick={select_mc}
//                     />
//                     <TextField
//                       id={'' + index}
//                       label=''
//                       defaultValue={option}
//                       color='secondary'
//                       type={input_component as string}
//                       multiline
//                       rows={1}
//                       rowsMax={4}
//                     />
//                   </Grid>
//                   <Grid item xs={3}>
//                     <Checkbox
//                       value={index}
//                       checked={selected_mc.correct === '' + index}
//                       onClick={select_correct_mc}
//                     />
//                   </Grid>
//                 </Grid>
//               </ListItem>
//             )
//           )}
//           <ListItem>
//             <Button
//               className={classes.addMultiChoiceButton}
//               onClick={(_) => add_mc_answer(null)}
//             >
//               + add option
//             </Button>
//           </ListItem>
//         </List>
//       ) : (
//         <React.Fragment>
//           <TextField
//             id='patient-response'
//             label='Patient Response'
//             color='secondary'
//             type={input_component as string}
//           />
//           {identifying && (
//             <TextField
//               id='correct-answer'
//               label='Correct Answer'
//               defaultValue={correct_answer}
//               color='secondary'
//               type={input_component as string}
//             />
//           )}
//           <FormControlLabel
//             control={<Checkbox />}
//             label={
//               <Typography variant='h4' color='textSecondary'>
//                 Correct?
//               </Typography>
//             }
//             labelPlacement='start'
//           />
//         </React.Fragment>
//       )}
//     </FormGroup>
//   );

//   return (
//     <FormControl component='fieldset' fullWidth>
//       <FormGroup row className={classes.form_group_row}>
//         <Typography variant='h2'>{`${index}. ${title}`}</Typography>
//         <FormControlLabel
//           control={<Switch checked={mc} onChange={toggle_mc} />}
//           label={
//             <Typography variant='h4' color='textSecondary'>
//               Multiple choice?
//             </Typography>
//           }
//           labelPlacement='start'
//           color='textSecondary'
//         />
//       </FormGroup>
//       {question_section}
//     </FormControl>
//   );
// };
