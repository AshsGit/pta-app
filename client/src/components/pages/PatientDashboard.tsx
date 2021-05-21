import {
  Box,
  CircularProgress,
  Theme,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';
import { useHistory, useParams } from 'react-router-dom';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import HistoryIcon from '@material-ui/icons/History';
import Button from '@material-ui/core/Button';
import '../../App.css';
import React, { useState, useEffect } from 'react';
import { WptasService } from '../../services/WptasService';
import { AbsService } from '../../services/AbsService';
import { PatientService } from '../../services/PatientService';

const styles: Styles<Theme, any> = (theme: any) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1rem',
    color: 'white',
  },
  backdrop: {
    backgroundColor: 'var(--color-neutral)',
    height: 'var(--backdrop-height)',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  card: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '1.5rem',
    textTransform: 'none',
    fontSize: '20px',
    boxShadow: '0px 25px 25px -20px rgba(0, 0, 0, 0.25)',
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: '#EFEFEF',
    },
  },
  icon: {
    fontSize: '60px',
    marginRight: '2rem',
  },
  wptasIcon: {
    color: 'var(--color-primary-dark)',
  },
  absIcon: {
    color: 'var(--color-accent-dark)',
  },
  historyIcon: {
    color: '#777',
  },
  label: {
    textAlign: 'left',
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: '100%',
    maxWidth: '600px',
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    '&>.dashboard-button:not(:last-child)': {
      marginBottom: '2rem',
    },
  },
  buttonWrapper: {
    '&>*': { width: '100%' },
  },
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0 1rem',
  },
  emptyState: {
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    fontSize: '22px',
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    marginTop: '1rem',
    fontWeight: 400,
    fontSize: '18px',
  },
});

export const PatientDashboard = withStyles(styles)(({ classes }: any) => {
  const history = useHistory();
  const { id } = useParams() as any;
  const wptasService = new WptasService();
  const absService = new AbsService();
  const patientService = new PatientService();

  const [wptasDisabled, setWptasDisabled] = useState(null);
  const [absDisabled, setAbsDisabled] = useState(null);
  const [patientExists, setPatientExists] = useState(null);

  useEffect(() => {
    if (patientExists === null) {
      setPatientFound();
    }
    if (wptasDisabled === null) {
      setWptasVisibility();
    }
    if (absDisabled === null) {
      setAbsVisibility();
    }
  });

  const setPatientFound = async () => {
    patientService.getPatient(id).subscribe((patient) => {
      if (!patient) {
        setPatientExists(false);
        return;
      }
      setPatientExists(true);
    });
  };

  const setWptasVisibility = async () => {
    wptasService.getLastWptasSubmissionDate(id).subscribe((date) => {
      if (!date) {
        setWptasDisabled(false);
        return;
      }

      let today = new Date();
      today.setHours(0, 0, 0, 0);
      setWptasDisabled(date.getTime() === today.getTime());
    });
  };

  const setAbsVisibility = async () => {
    absService.getLastAbsSubmissionDate(id).subscribe((date) => {
      if (!date) {
        setAbsDisabled(false);
        return;
      }

      let today = new Date();
      today.setHours(0, 0, 0, 0);
      setAbsDisabled(date.getTime() === today.getTime());
    });
  };

  const WPTASTest = () => {
    history.push(`/${id}/wptas`);
  };

  const ABSTest = () => {
    history.push(`/${id}/abs`);
  };

  const PatientHistory = () => {
    history.push(`/${id}/history`);
  };

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.backdrop}></div>
      <div className={classes.page}>
        {patientExists === null ||
        wptasDisabled === null ||
        absDisabled === null ? (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            width='100%'
            height='100vh'
            style={{ padding: '2rem' }}
          >
            <CircularProgress />
          </Box>
        ) : patientExists === true ? (
          <React.Fragment>
            <DashboardHeader />
            <DashboardButton
              disabled={wptasDisabled === null ? true : wptasDisabled}
              onClick={WPTASTest}
            >
              <NoteAddIcon className={`${classes.icon} ${classes.wptasIcon}`} />
              <span className={classes.label}>
                {wptasDisabled === true ? 'WPTAS Completed' : 'Start WPTAS'}
              </span>
            </DashboardButton>
            <DashboardButton
              disabled={absDisabled === null ? true : absDisabled}
              onClick={ABSTest}
            >
              <NoteAddIcon className={`${classes.icon} ${classes.absIcon}`} />
              <span className={classes.label}>
                {absDisabled === true ? 'ABS Completed' : 'Start ABS'}
              </span>
            </DashboardButton>
            <DashboardButton onClick={PatientHistory}>
              <HistoryIcon
                className={`${classes.icon} ${classes.historyIcon}`}
              />
              <span className={classes.label}>View Patient History</span>
            </DashboardButton>
          </React.Fragment>
        ) : (
          <div className={classes.emptyState}>
            <div>Patient does not exist</div>
            <div className={classes.subtitle}>Please scan a valid QR code</div>
          </div>
        )}
      </div>
    </div>
  );
});

const DashboardHeader = withStyles(styles)(({ classes }: any) => {
  const { id } = useParams() as any;

  return (
    <div className={classes.header}>
      <h2>{`Patient ${id}`}</h2>
    </div>
  );
});

const DashboardButton = withStyles(styles)(
  ({ classes, children, onClick, disabled }: any) => {
    if (disabled) {
      return (
        <Tooltip title='Test already completed today'>
          <span className={`dashboard-button ${classes.buttonWrapper}`}>
            <Button disabled={true} className={classes.card} onClick={onClick}>
              {children}
            </Button>
          </span>
        </Tooltip>
      );
    }
    return (
      <Button className={`dashboard-button ${classes.card}`} onClick={onClick}>
        {children}
      </Button>
    );
  }
);
