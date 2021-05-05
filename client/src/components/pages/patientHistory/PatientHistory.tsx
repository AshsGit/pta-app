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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AbsService } from '../../../services/AbsService';
import { TestHistoryList } from './TestHistoryList';
import { TestTableSummary } from './TestTableSummary';

const styles: Styles<Theme, any> = (theme: any) => ({
  // Header classes
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0.5rem',
    color: 'white',
    marginBottom: '1rem',
  },
  menuIcon: { color: 'white' },

  // Test type selector classes
  selectControl: { minWidth: '150px' },
  selectLabel: { color: 'white !important', fontSize: '14px' },
  select: {
    color: 'white !important',
    backgroundColor: 'transparent !important',
    '&:before': {
      borderColor: 'white !important',
    },
    '& *': {
      backgroundColor: 'transparent !important',
      borderColor: 'white !important',
    },
  },
  icon: {
    color: 'white',
  },

  // Background classes
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

  // Back button classes
  backButton: {
    color: 'white',
    maxWidth: '30px',
    minWidth: '30px',
    width: '30px',
    padding: 0,
  },
  hidden: {
    pointerEvents: 'none',
    visibility: 'hidden',
  },

  // Page classes
  page: {
    paddingBottom: '2rem',
    display: 'flex',
    alignItems: 'stretch',
    height: '100%',
    minHeight: '100vh',
    flexGrow: 1,
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    maxWidth: '1000px',
    width: '100%',
  },
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0 1rem',
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
    // Update test type query param
    history.replace({
      pathname: `/${id}/history`,
      search: `?type=${event.target.value}`,
    });
  };

  return (
    <div className={classes.header}>
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
      <Button className={`${classes.backButton} ${classes.hidden}`}>
        <ArrowBackIcon />
      </Button>
      {/* TODO: Implement Export */}
      {/* <ExportMenu /> */}
    </div>
  );
});

export const PatientHistory = withStyles(styles)(({ classes }: any) => {
  const location = useLocation();
  const absService = new AbsService();

  let type = new URLSearchParams(location.search).get('type');
  if (!['wptas', 'abs'].includes(type || '')) {
    type = 'wptas';
  }
  const [testType, setTestType] = useState(type);

  return (
    <div className={classes.pageWrapper}>
      <div
        className={`${classes.backdrop} ${
          classes[testType === 'wptas' ? 'wptasBackdrop' : 'absBackdrop']
        }`}
      ></div>
      <div className={classes.page}>
        <Header testType={testType} setTestType={setTestType} />
        <div style={{ padding: '0 1rem' }}>
          <TestTableSummary
            absService={absService}
            testType={testType}
            style={{ marginBottom: '2rem' }}
          />
          <TestHistoryList absService={absService} testType={testType} />
        </div>
      </div>
    </div>
  );
});
