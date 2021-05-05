import {
  withStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  CircularProgress,
  Theme,
} from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const styles: Styles<Theme, any> = (theme: any) => ({
  card: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: '1rem',
    textTransform: 'none',
    fontSize: '20px',
    boxShadow: '0px 25px 25px -20px rgba(0, 0, 0, 0.25)',
    borderRadius: '12px',
  }, // Table styles
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
  bodyCell: {
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
  btnCell: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      width: '100%',
    },
  },
  tableContainer: {
    borderRadius: 0,
    boxShadow: 'none',
  },
  odd: {
    '& td': { backgroundColor: '#EDEDED' },
  },
  even: {
    '& td': { backgroundColor: 'white' },
  },
});

export const TestTableSummary = withStyles(styles)(
  ({ classes, absService, testType, ...other }: any) => {
    return (
      <div {...other} className={classes.card}>
        {testType === 'wptas' ? (
          <WPTASTable absService={absService} />
        ) : (
          <ABSTable absService={absService} />
        )}
      </div>
    );
  }
);

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
              {Object.keys(wptasRows[0])
                .filter((key) => key !== 'question')
                .map((key: string) => (
                  <TableCell
                    className={`${classes.cell} ${
                      i === wptasRows.length - 1
                        ? classes.footerCell
                        : classes.bodyCell
                    }`}
                    key={key}
                    align='center'
                  >
                    {row[key]}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

const ABSTable = withStyles(styles)(({ classes, absService }: any) => {
  const { id } = useParams() as any;
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    if (!summary || !summary.length) {
      getAbsSummary();
    }
  });

  // Service calls:
  const getAbsSummary = async () => {
    absService.getAbsSummary(id).subscribe((summary) => {
      setSummary(summary);
    });
  };

  if (summary.length === 0) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        width='100%'
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table size='small' aria-label='ABS table'>
        <TableHead>
          <TableRow>
            {Object.keys(summary[0]).map((key, i) => (
              <TableCell
                className={`${classes.cell} ${
                  i === 0 ? classes.questionCell : ''
                } ${i === summary.length - 1 ? classes.footerCell : ''} ${
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
          {summary.map((row, i) => (
            <TableRow
              className={`${i % 2 === 0 ? classes.even : classes.odd}`}
              key={row.question}
            >
              <TableCell
                className={`${classes.cell} ${
                  i === summary.length - 1 ? classes.footerCell : ''
                } ${classes.questionCell} abs`}
              >
                {row.question}
              </TableCell>
              {Object.keys(summary[0])
                .filter((key) => key !== 'question')
                .map((key: string) => (
                  <TableCell
                    className={`${classes.cell} ${
                      i === summary.length - 1
                        ? classes.footerCell
                        : classes.tableCell
                    }`}
                    key={key}
                    align='center'
                  >
                    {row[key]}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
