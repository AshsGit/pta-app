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
    flexDirection: 'column',
    alignItems: 'stretch',
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
  note: {
    fontSize: '13px',
    textAlign: 'end',
    marginTop: '1rem',
  },
});

export const TestTableSummary = withStyles(styles)(
  ({ classes, wptasService, absService, testType, ...other }: any) => {
    return (
      <div {...other} className={classes.card}>
        {testType === 'wptas' ? (
          <Box display='flex' flexDirection='column'>
            <WPTASTable wptasService={wptasService} />
            <span className={classes.note}>
              Scores are marked with an asterisk (*) if multiple choice options
              were used
            </span>
          </Box>
        ) : (
          <ABSTable absService={absService} />
        )}
      </div>
    );
  }
);

const WPTASTable = withStyles(styles)(({ classes, wptasService }: any) => {
  const { id } = useParams() as any;
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    if (!summary || !summary.length) {
      getWptasSummary();
    }
  });

  // Service calls:
  const getWptasSummary = async () => {
    wptasService.getWptasSummary(id).subscribe((summary) => {
      setSummary(summary);
    });
  };

  if (!summary || summary.length === 0) {
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
      <Table size='small' aria-label='WPTAS table'>
        <TableHead>
          <TableRow>
            {Object.keys(summary[0]).map((key, i) => (
              <TableCell
                className={`${classes.cell} ${
                  i === 0 ? classes.questionCell : ''
                } ${i === summary.length - 1 ? classes.footerCell : ''} ${
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
          {summary.map((row, i) => (
            <TableRow
              className={`${i % 2 === 0 ? classes.even : classes.odd}`}
              key={row.question}
            >
              <TableCell
                className={`${classes.cell} ${
                  i === summary.length - 1 ? classes.footerCell : ''
                } ${classes.questionCell} wptas`}
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
