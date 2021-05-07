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

export const TestHistoryList = withStyles(styles)(
  ({ classes, testType, absService }: any) => {
    return (
      <div className={classes.card}>
        {testType === 'wptas' ? (
          <WPTASHistory absService={absService} />
        ) : (
          <ABSHistory absService={absService} />
        )}
      </div>
    );
  }
);

const WPTASHistory = withStyles(styles)(({ classes, ...other }: any) => {
  return (
    <div {...other} className={classes.historyContainer}>
      <h4>WPTAS Test History</h4>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label='WPTAS history'>
          <TableHead>
            <TableRow className={`${classes.historyHeader} wptas`}>
              <TableCell>Date</TableCell>
              <TableCell>Examiner</TableCell>
              <TableCell>Score</TableCell>
              {/* TODO: View individual submission: */}
              {/* <TableCell></TableCell> */}
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
                {/* TODO: View individual submission: */}
                {/* <TableCell className={classes.btnCell}>
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
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

const ABSHistory = withStyles(styles)(({ classes, absService }: any) => {
  const { id } = useParams() as any;

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (!submissions || !submissions.length) {
      getAbsSubmissions();
    }
  });

  const getAbsSubmissions = async () => {
    absService.getAbsSubmissions(id).subscribe((submissions) => {
      setSubmissions(submissions);
    });
  };

  if (!submissions || submissions.length === 0) {
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
    <div className={classes.historyContainer}>
      <h4>ABS Test History</h4>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label='ABS history'>
          <TableHead>
            <TableRow className={`${classes.historyHeader} abs`}>
              <TableCell>Date</TableCell>
              <TableCell>Examiner</TableCell>
              <TableCell>Score</TableCell>
              {/* TODO: View individual submission: */}
              {/* <TableCell></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((row, i) => (
              <TableRow
                className={`${i % 2 === 0 ? classes.even : classes.odd}`}
                key={row.submissionId}
              >
                <TableCell style={{ fontWeight: 600 }}>
                  {row.submissionDate.toDateString()}
                </TableCell>
                <TableCell>{row.examinerInitials || '-'}</TableCell>
                <TableCell>{row.total}</TableCell>
                {/* TODO: View individual submission: */}
                {/* <TableCell className={classes.btnCell}>
                  <OutlineButton
                    style={{ maxWidth: '150px' }}
                    onClick={() => {
                      history.push(`/${id}/abs?submission=${row.submissionId}`);
                    }}
                  >
                    View
                  </OutlineButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

const ResultsCard = withStyles(styles)(
  ({ classes, children, ...other }: any) => {
    return (
      <div {...other} className={classes.card}>
        {children}
      </div>
    );
  }
);

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