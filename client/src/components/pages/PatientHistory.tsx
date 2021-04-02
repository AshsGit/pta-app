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

import '../../App.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles: Styles<Theme, any> = (theme: any) => ({
  headCell: {
    padding: '4px',
    textAlign: 'center',
    fontSize: '11px',
    color: 'white',
    backgroundColor: 'var(--color-primary-muted) !important',
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
    minWidth: '140px',
    position: 'sticky',
    left: 0,
    paddingLeft: '8px',
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
    padding: '1.5rem',
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

const ResultsCard = withStyles(styles)(({ classes, children }: any) => {
  return (
    <div className={`card ${classes.card}`}>
      {children}
      {/* <div className={`card ${classes.card}`}> */}

      {/* </div> */}
    </div>
  );
});

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const WPTASTable = withStyles(styles)(({ classes }: any) => {
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} size='small' aria-label='WPTAS table'>
        <TableHead>
          <TableRow>
            {Object.keys(rows[0]).map((key, i) => (
              <TableCell
                className={`${classes.cell} ${
                  i === 0 ? classes.questionCell : ''
                } ${i === rows.length - 1 ? classes.footerCell : ''} ${
                  classes.headCell
                }`}
                key={key}
              >
                {capitalise(key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              className={`${i % 2 === 0 ? classes.even : classes.odd}`}
              key={row.question}
            >
              <TableCell
                className={`${classes.cell} ${
                  i === rows.length - 1 ? classes.footerCell : ''
                } ${classes.questionCell}`}
              >
                {row.question}
              </TableCell>
              {
                Object.keys(rows[0])
                  .filter((key) => key !== 'question')
                  .map((key: string) => (
                    <TableCell
                      className={`${classes.cell} ${
                        i === rows.length - 1
                          ? classes.footerCell
                          : classes.tableCell
                      }`}
                      key={key}
                      align='center'
                    >
                      {row[key]}
                    </TableCell>
                  ))
                // .map((key: string) => (<TableCell classes={{ root: classes.root, footer: classes.footer, head: classes.head, body: classes.body }} variant={i === rows.length - 1 ? 'footer' : 'body'} key={key} align="center">{row[key]}</TableCell>))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

// TODO
const ABSTable = withStyles(styles)(({ classes }: any) => {
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} size='small' aria-label='WPTAS table'>
        <TableHead>
          <TableRow>
            {Object.keys(rows[0]).map((key, i) => (
              <TableCell
                className={`${classes.cell} ${
                  i === 0 ? classes.questionCell : ''
                } ${i === rows.length - 1 ? classes.footerCell : ''} ${
                  classes.headCell
                }`}
                key={key}
              >
                {capitalise(key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              className={`${i % 2 === 0 ? classes.even : classes.odd}`}
              key={row.question}
            >
              <TableCell
                className={`${classes.cell} ${
                  i === rows.length - 1 ? classes.footerCell : ''
                } ${classes.questionCell}`}
              >
                {row.question}
              </TableCell>
              {
                Object.keys(rows[0])
                  .filter((key) => key !== 'question')
                  .map((key: string) => (
                    <TableCell
                      className={`${classes.cell} ${
                        i === rows.length - 1
                          ? classes.footerCell
                          : classes.tableCell
                      }`}
                      key={key}
                      align='center'
                    >
                      {row[key]}
                    </TableCell>
                  ))
                // .map((key: string) => (<TableCell classes={{ root: classes.root, footer: classes.footer, head: classes.head, body: classes.body }} variant={i === rows.length - 1 ? 'footer' : 'body'} key={key} align="center">{row[key]}</TableCell>))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export const PatientHistory = withStyles(styles)(({ classes }: any) => {
  // const history = useHistory();
  // TODO: make this persist over reloads in the same session

  const location = useLocation();
  let type = new URLSearchParams(location.search).get('type');
  if (!['wptas', 'abs'].includes(type || '')) {
    type = 'wptas';
  }
  const [testType, setTestType] = React.useState(type);

  // history.listen((location: any, action: any) => {

  //   console.log(action, location, location.pathname, location.state)

  // })

  return (
    <div className='page-wrapper'>
      <div
        className={`${classes.backdrop} ${
          classes[testType === 'wptas' ? 'wptasBackdrop' : 'absBackdrop']
        }`}
      ></div>
      <div className={`page history`}>
        <Header testType={testType} setTestType={setTestType} />
        <div style={{ padding: '0 1rem' }}>
          <ResultsCard>
            {testType === 'wptas' ? <WPTASTable /> : <ABSTable />}
          </ResultsCard>
        </div>
      </div>
    </div>
  );
});

const rows = [
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
