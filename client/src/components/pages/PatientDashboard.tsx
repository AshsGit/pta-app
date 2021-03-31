import { Theme, withStyles } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
    color: 'white'
  },
  menuIcon: { color: 'white' },
  backdrop: {
    backgroundColor: 'var(--color-primary)',
    height: 'var(--backdrop-height)',
    width: '100%',
    position: 'absolute'
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
    '&:hover': {
      backgroundColor: '#EFEFEF',
    }
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
    color: '#777'
  },
  page: {
    '&>.card:not(:last-child)': {
      marginBottom: '2rem'
    }
  }
});

const showQR = () => {

}

const navigateHome = () => {

}

const options = [
  { label: "Show QR code", callback: showQR },
  { label: "Exit patient view", callback: navigateHome }
];

const PatientMenu = withStyles(styles)(({ classes }: any) => {
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
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
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
          <MenuItem key={option.label} onClick={(event) => handleMenuItemClick(event, index)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
})

const DashboardHeader = withStyles(styles)(({ classes }: any) => {
  const { id } = useParams() as any;

  return <div className={classes.header}>
    <h2>{`Patient ${id}`}</h2>
    <PatientMenu />
  </div>
});

const DashboardButton = withStyles(styles)(({ classes, children, onClick }: any) => {
  return (
    <Button className={`card ${classes.card}`} onClick={onClick}>
      {children}
      {/* <div className={`card ${classes.card}`}> */}

      {/* </div> */}
    </Button>
  );
});

export const PatientDashboard = withStyles(styles)(({ classes }: any) => {
  const history = useHistory();
  const { id } = useParams() as any;

  const WPTASTest = () => {
    history.push(`/wptas/${id}`);
  };

  const ABSTest = () => {
    history.push(`/abs/${id}`);
  };

  const PatientHistory = () => {
    history.push(`/history/${id}`);
  };

  return (
    <div className='page-wrapper'>
      <div className={classes.backdrop}></div>
      <div className={`page dashboard ${classes.page}`}>
        <DashboardHeader />
        <DashboardButton onClick={WPTASTest}>
          <NoteAddIcon className={`${classes.icon} ${classes.wptasIcon}`} />
          <span>Start WPTAS</span>
        </DashboardButton>
        <DashboardButton onClick={ABSTest}>
          <NoteAddIcon className={`${classes.icon} ${classes.absIcon}`} />
          <span>Start ABS</span>
        </DashboardButton>
        <DashboardButton onClick={PatientHistory}>
          <HistoryIcon className={`${classes.icon} ${classes.historyIcon}`} />
          <span>View Patient History</span>
        </DashboardButton>
      </div>
    </div>
  )
});