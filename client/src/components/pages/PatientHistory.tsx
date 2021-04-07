import { Button, Theme, withStyles } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';
import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { OutlineButton } from '../layout/Buttons';

import '../../App.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles: Styles<Theme, any> = (theme: any) => ({
  headCell: {
    padding: '4px',
    textAlign: 'center',
    fontSize: '11px',
    color: 'white',
    '&.wptas': {
      backgroundColor: 'var(--color-primary-muted) !important',
    },
    '&.abs': {
      backgroundColor: 'var(--color-accent-muted) !important',
    },
  },
  cell: {
    fontSize: '13px',
    padding: '6px 4px',
  },
  footerCell: {
    textAlign: 'center',
    fontWeight: 600,
  },
  tableCell: {
    textAlign: 'center',
  },
  questionCell: {
    textAlign: 'left',
    position: 'sticky',
    left: 0,
    paddingLeft: '8px',
    '&.wptas': {
      minWidth: '140px',
    },
    '&.abs': {
      minWidth: '170px',
    },
  },
  odd: {
    '& td': { backgroundColor: '#EDEDED' },
  },
  even: {
    '& td': { backgroundColor: 'white' },
  },
  tableContainer: {
    borderRadius: 0,
    boxShadow: 'none',
  },
  historyHeader: {
    '& th': {
      padding: '0.5rem 1rem',
      color: 'white',
    },
    '&.wptas': {
      backgroundColor: 'var(--color-primary-muted) !important',
    },
    '&.abs': {
      backgroundColor: 'var(--color-accent-muted) !important',
    },
  },
  btnCell: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      width: '100%',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0.5rem',
    color: 'white',
    marginBottom: '1rem',
  },
  menuIcon: { color: 'white' },
  selectControl: { minWidth: '150px' },
  selectLabel: { color: 'white !important', fontSize: '14px' },
  select: {
    color: 'white !important',
    backgroundColor: 'transparent !important',
    '&:before': {
      borderColor: 'white !important',
    },
    // TODO get rid of focus color
    '& *': {
      backgroundColor: 'transparent !important',
      borderColor: 'white !important',
    },
  },
  icon: {
    color: 'white',
  },
  backdrop: {
    height: 'var(--backdrop-height)',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  wptasBackdrop: {
    backgroundColor: 'var(--color-primary-dark)',
  },
  absBackdrop: {
    backgroundColor: 'var(--color-accent-dark)',
  },
  card: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: '1rem',
    textTransform: 'none',
    fontSize: '20px',
    boxShadow: '0px 25px 25px -20px rgba(0, 0, 0, 0.25)',
    borderRadius: '12px',
  },
  backButton: {
    color: 'white',
    maxWidth: '30px',
    minWidth: '30px',
    width: '30px',
    padding: 0,
  },
  page: {
    paddingBottom: '2rem',
  },
  historyContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    '& h4': {
      textAlign: 'center',
      margin: 0,
      marginBottom: '1rem',
    },
  },
});

const exportWptas = () => {};

const exportAbs = () => {};

const options = [
  { label: 'Export WPTAS data', callback: exportWptas },
  { label: 'Export ABS data', callback: exportAbs },
];

const ExportMenu = withStyles(styles)(({ classes }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: any, index: number) => {
    options[index].callback();
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleMenuClick}
      >
        <MoreVertIcon classes={{ root: classes.menuIcon }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleMenuClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.label}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
});

const Header = withStyles(styles)(({ testType, setTestType, classes }: any) => {
  const { id } = useParams() as any;
  const history = useHistory();

  const handleChange = (event: any) => {
    setTestType(event.target.value);
    // Update query param
    history.replace({
      pathname: `/${id}/history`,
      search: `?type=${event.target.value}`,
    });
  };

  return (
    <div className={classes.header}>
      {/* <h2>{`Patient ${id}`}</h2> */}
      <Button
        className={classes.backButton}
        onClick={() => {
          history.push(`/${id}`);
        }}
      >
        <ArrowBackIcon />
      </Button>
      <FormControl className={classes.selectControl}>
        <InputLabel className={classes.selectLabel} shrink id='test-type-label'>
          Test type
        </InputLabel>
        <Select
          labelId='test-type-label'
          id='test-type-select'
          value={testType}
          onChange={handleChange}
          displayEmpty
          className={classes.select}
          inputProps={{ classes: { icon: classes.icon } }}
        >
          <MenuItem value='wptas'>WPTAS</MenuItem>
          <MenuItem value='abs'>ABS</MenuItem>
        </Select>
      </FormControl>
      <ExportMenu />
    </div>
  );
});

const ResultsCard = withStyles(styles)(
  ({ classes, children, ...other }: any) => {
    return (
      <div {...other} className={`card ${classes.card}`}>
        {children}
        {/* <div className={`card ${classes.card}`}> */}

        {/* </div> */}
      </div>
    );
  }
);

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const WPTASTable = withStyles(styles)(({ classes }: any) => {
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table size='small' aria-label='WPTAS table'>
        <TableHead>
          <TableRow>
            {Object.keys(wptasRows[0]).map((key, i) => (
              <TableCell
                className={`${classes.cell} ${
                  i === 0 ? classes.questionCell : ''
                } ${i === wptasRows.length - 1 ? classes.footerCell : ''} ${
                  classes.headCell
                } wptas`}
                key={key}
              >
                {capitalise(key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {wptasRows.map((row, i) => (
            <TableRow
              className={`${i % 2 === 0 ? classes.even : classes.odd}`}
              key={row.question}
            >
              <TableCell
                className={`${classes.cell} ${
                  i === wptasRows.length - 1 ? classes.footerCell : ''
                } ${classes.questionCell} wptas`}
              >
                {row.question}
              </TableCell>
              {
                Object.keys(wptasRows[0])
                  .filter((key) => key !== 'question')
                  .map((key: string) => (
                    <TableCell
                      className={`${classes.cell} ${
                        i === wptasRows.length - 1
                          ? classes.footerCell
                          : classes.tableCell
                      }`}
                      key={key}
                      align='center'
                    >
                      {row[key]}
                    </TableCell>
                  ))
                // .map((key: string) => (<TableCell classes={{ root: classes.root, footer: classes.footer, head: classes.head, body: classes.body }} variant={i === wptasRows
                // .length - 1 ? 'footer' : 'body'} key={key} align="center">{row[key]}</TableCell>))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

const ABSTable = withStyles(styles)(({ classes }: any) => {
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table size='small' aria-label='ABS table'>
        <TableHead>
          <TableRow>
            {Object.keys(absRows[0]).map((key, i) => (
              <TableCell
                className={`${classes.cell} ${
                  i === 0 ? classes.questionCell : ''
                } ${i === absRows.length - 1 ? classes.footerCell : ''} ${
                  classes.headCell
                } abs`}
                key={key}
              >
                {capitalise(key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {absRows.map((row, i) => (
            <TableRow
              className={`${i % 2 === 0 ? classes.even : classes.odd}`}
              key={row.question}
            >
              <TableCell
                className={`${classes.cell} ${
                  i === absRows.length - 1 ? classes.footerCell : ''
                } ${classes.questionCell} abs`}
              >
                {row.question}
              </TableCell>
              {
                Object.keys(absRows[0])
                  .filter((key) => key !== 'question')
                  .map((key: string) => (
                    <TableCell
                      className={`${classes.cell} ${
                        i === absRows.length - 1
                          ? classes.footerCell
                          : classes.tableCell
                      }`}
                      key={key}
                      align='center'
                    >
                      {row[key]}
                    </TableCell>
                  ))
                // .map((key: string) => (<TableCell classes={{ root: classes.root, footer: classes.footer, head: classes.head, body: classes.body }} variant={i === wptasRows
                // .length - 1 ? 'footer' : 'body'} key={key} align="center">{row[key]}</TableCell>))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

const WPTASHistory = withStyles(styles)(({ classes }: any) => {
  const history = useHistory();
  const { id } = useParams() as any;

  return (
    <div className={classes.historyContainer}>
      <h4>WPTAS Test History</h4>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label='WPTAS history'>
          <TableHead>
            <TableRow className={`${classes.historyHeader} wptas`}>
              <TableCell>Date</TableCell>
              <TableCell>Examiner</TableCell>
              <TableCell>Score</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wptasHistoryRows.map((row, i) => (
              <TableRow
                className={`${i % 2 === 0 ? classes.even : classes.odd}`}
                key={row.submissionId}
              >
                <TableCell style={{ fontWeight: 600 }}>
                  {row.date.toDateString()}
                </TableCell>
                <TableCell>{row.examiner}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell className={classes.btnCell}>
                  <OutlineButton
                    style={{ maxWidth: '150px' }}
                    onClick={() => {
                      history.push(
                        `/${id}/wptas?submission=${row.submissionId}`
                      );
                    }}
                  >
                    View
                  </OutlineButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

const ABSHistory = withStyles(styles)(({ classes }: any) => {
  const history = useHistory();
  const { id } = useParams() as any;

  return (
    <div className={classes.historyContainer}>
      <h4>ABS Test History</h4>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label='ABS history'>
          <TableHead>
            <TableRow className={`${classes.historyHeader} abs`}>
              <TableCell>Date</TableCell>
              <TableCell>Examiner</TableCell>
              <TableCell>Score</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {absHistoryRows.map((row, i) => (
              <TableRow
                className={`${i % 2 === 0 ? classes.even : classes.odd}`}
                key={row.submissionId}
              >
                <TableCell style={{ fontWeight: 600 }}>
                  {row.date.toDateString()}
                </TableCell>
                <TableCell>{row.examiner}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell className={classes.btnCell}>
                  <OutlineButton
                    onClick={() => {
                      history.push(`/${id}/abs?submission=${row.submissionId}`);
                    }}
                  >
                    View
                  </OutlineButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export const PatientHistory = withStyles(styles)(({ classes }: any) => {
  const location = useLocation();
  let type = new URLSearchParams(location.search).get('type');
  if (!['wptas', 'abs'].includes(type || '')) {
    type = 'wptas';
  }
  const [testType, setTestType] = React.useState(type);

  return (
    <div className='page-wrapper'>
      <div
        className={`${classes.backdrop} ${
          classes[testType === 'wptas' ? 'wptasBackdrop' : 'absBackdrop']
        }`}
      ></div>
      <div className={`${classes.page} page history`}>
        <Header testType={testType} setTestType={setTestType} />
        <div style={{ padding: '0 1rem' }}>
          <ResultsCard style={{ marginBottom: '2rem' }}>
            {testType === 'wptas' ? <WPTASTable /> : <ABSTable />}
          </ResultsCard>
          <ResultsCard>
            {testType === 'wptas' ? <WPTASHistory /> : <ABSHistory />}
          </ResultsCard>
        </div>
      </div>
    </div>
  );
});

const absRows = [
  {
    question:
      '1. Short attention span, easy distractability, inability to concentrate',
    '31/10': 1,
    '1/11': 1,
    '2/11': 2,
    '3/11': 1,
    '4/11': 1,
    '5/11': 4,
    '6/11': 1,
  },
  {
    question: '2. Impulsive, impatient, low tolerance for pain or frustration',
    '31/10': 2,
    '1/11': 1,
    '2/11': 4,
    '3/11': 1,
    '4/11': 1,
    '5/11': 2,
    '6/11': 1,
  },
  {
    question: '3. Uncooperative, resistant to care, demanding',
    '31/10': 3,
    '1/11': 1,
    '2/11': 2,
    '3/11': 1,
    '4/11': 1,
    '5/11': 4,
    '6/11': 1,
  },
  {
    question:
      '4. Violent and / or threatening violence toward people or property',
    '31/10': 4,
    '1/11': 1,
    '2/11': 3,
    '3/11': 1,
    '4/11': 1,
    '5/11': 2,
    '6/11': 1,
  },
  {
    question: '5. Explosive and / or unpredictable anger',
    '31/10': 2,
    '1/11': 1,
    '2/11': 3,
    '3/11': 1,
    '4/11': 1,
    '5/11': 4,
    '6/11': 1,
  },
  {
    question: '6. Rocking, rubbing, moaning or other self-stimulating behavior',
    '31/10': 3,
    '1/11': 1,
    '2/11': 2,
    '3/11': 1,
    '4/11': 1,
    '5/11': 4,
    '6/11': 1,
  },
  {
    question: '7. Pulling at tubes, restraints, etc.',
    '31/10': 4,
    '1/11': 1,
    '2/11': 3,
    '3/11': 1,
    '4/11': 1,
    '5/11': 2,
    '6/11': 1,
  },
  {
    question: '8. Wandering from treatment areas',
    '31/10': 2,
    '1/11': 1,
    '2/11': 3,
    '3/11': 1,
    '4/11': 4,
    '5/11': 4,
    '6/11': 1,
  },
  {
    question: '9. Restlessness, pacing, excessive movement',
    '31/10': 4,
    '1/11': 1,
    '2/11': 4,
    '3/11': 2,
    '4/11': 1,
    '5/11': 3,
    '6/11': 1,
  },
  {
    question: '10. Repetitive behaviors, motor and / or verbal',
    '31/10': 4,
    '1/11': 1,
    '2/11': 2,
    '3/11': 1,
    '4/11': 1,
    '5/11': 3,
    '6/11': 1,
  },
  {
    question: '11. Rapid, loud or excessive talking',
    '31/10': 3,
    '1/11': 1,
    '2/11': 4,
    '3/11': 1,
    '4/11': 1,
    '5/11': 2,
    '6/11': 1,
  },
  {
    question: '12. Sudden changes of mood',
    '31/10': 3,
    '1/11': 1,
    '2/11': 4,
    '3/11': 1,
    '4/11': 1,
    '5/11': 2,
    '6/11': 1,
  },
  {
    question: '13. Easily initiated or excessive crying and / or laughter',
    '31/10': 3,
    '1/11': 1,
    '2/11': 4,
    '3/11': 1,
    '4/11': 1,
    '5/11': 2,
    '6/11': 1,
  },
  {
    question: '14. Self-abusiveness, physical and / or verbal',
    '31/10': 3,
    '1/11': 1,
    '2/11': 4,
    '3/11': 1,
    '4/11': 1,
    '5/11': 2,
    '6/11': 1,
  },
  {
    question: 'Total',
    '31/10': 21,
    '1/11': 32,
    '2/11': 15,
    '3/11': 12,
    '4/11': 21,
    '5/11': 26,
    '6/11': 24,
  },
];

// Sorted by descending date
const wptasHistoryRows = [
  {
    submissionId: '123',
    date: new Date(2020, 10, 3),
    examiner: 'E.S',
    score: 8,
  },
  {
    submissionId: '234',
    date: new Date(2020, 10, 2),
    examiner: 'J.Z',
    score: 9,
  },
  {
    submissionId: '345',
    date: new Date(2020, 10, 1),
    examiner: 'T.S',
    score: 8,
  },
  {
    submissionId: '456',
    date: new Date(2020, 9, 31),
    examiner: 'E.S',
    score: 7,
  },
];

// Sorted by descending date
const absHistoryRows = [
  {
    submissionId: '123',
    date: new Date(2020, 10, 3),
    examiner: 'E.S',
    score: 8,
  },
  {
    submissionId: '234',
    date: new Date(2020, 10, 2),
    examiner: 'J.Z',
    score: 9,
  },
  {
    submissionId: '345',
    date: new Date(2020, 10, 1),
    examiner: 'T.S',
    score: 8,
  },
  {
    submissionId: '456',
    date: new Date(2020, 9, 31),
    examiner: 'E.S',
    score: 7,
  },
];

const wptasRows = [
  {
    question: '1. How old are you?',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: '2. What is your date of birth?',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: '3. What month are we in?',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: '4. What time of day is it?',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: '5. What day of the week is it?',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: '6. What year are we in?',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: '7. What is the name of this place?',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: '8. Face',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: '9. Name',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: '10. Picture 1',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: '11. Picture 2',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: '12. Picture 3',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
  {
    question: 'Total',
    '31/10': 0,
    '1/11': 1,
    '2/11': 0,
    '3/11': 1,
    '4/11': 1,
    '5/11': 0,
    '6/11': 1,
    '7/11': 0,
    '8/11': 1,
    '9/11': 1,
  },
];
