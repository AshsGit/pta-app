import { Theme, withStyles } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';
import { useHistory, useParams } from 'react-router-dom';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import HistoryIcon from '@material-ui/icons/History';
import Button from '@material-ui/core/Button';
import '../../App.css';

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
    minHeight: '100vh',
    maxWidth: '600px',
    flexGrow: 1,
    zIndex: 1,
    '&>button:not(:last-child)': {
      marginBottom: '2rem',
    },
  },
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0 1rem',
  },
});

export const PatientDashboard = withStyles(styles)(({ classes }: any) => {
  const history = useHistory();
  const { id } = useParams() as any;

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
        <DashboardHeader />
        <DashboardButton onClick={WPTASTest}>
          <NoteAddIcon className={`${classes.icon} ${classes.wptasIcon}`} />
          <span className={classes.label}>Start WPTAS</span>
        </DashboardButton>
        <DashboardButton onClick={ABSTest}>
          <NoteAddIcon className={`${classes.icon} ${classes.absIcon}`} />
          <span className={classes.label}>Start ABS</span>
        </DashboardButton>
        <DashboardButton onClick={PatientHistory}>
          <HistoryIcon className={`${classes.icon} ${classes.historyIcon}`} />
          <span className={classes.label}>View Patient History</span>
        </DashboardButton>
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
  ({ classes, children, onClick }: any) => {
    return (
      <Button className={classes.card} onClick={onClick}>
        {children}
      </Button>
    );
  }
);
