import { Theme, withStyles } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import '../../App.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles: Styles<Theme, any> = (theme: any) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    color: 'white',
    marginBottom: "1rem"
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
      borderColor: 'white !important'
    }
  },
  icon: {
    color: 'white'
  },
  backdrop: {
    height: 'var(--backdrop-height)',
    width: '100%',
    position: 'absolute',
    top: 0
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
    '&:hover': {
      backgroundColor: '#EFEFEF',
    }
  }
});

const exportWptas = () => {

}

const exportAbs = () => {

}

const options = [
  { label: "Export WPTAS data", callback: exportWptas },
  { label: "Export ABS data", callback: exportAbs }
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

const Header = withStyles(styles)(({ testType, setTestType, classes }: any) => {
  const history = useHistory();

  const handleChange = (event: any) => {
    setTestType(event.target.value);
  };

  return <div className={classes.header}>
    {/* <h2>{`Patient ${id}`}</h2> */}
    <ArrowBackIcon onClick={() => { history.goBack() }} />
    <FormControl className={classes.selectControl}>
      <InputLabel className={classes.selectLabel} shrink id="test-type-label">
        Test type
        </InputLabel>
      <Select
        labelId="test-type-label"
        id="test-type-select"
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

const WPTASTable = withStyles(styles)(({ classes }: any) => {
  return (
    <div>

    </div>
  );
})

export const PatientHistory = withStyles(styles)(({ classes }: any) => {
  const history = useHistory();
  const { id } = useParams() as any;
  // TODO: make this persist over reloads in the same session
  const [testType, setTestType] = React.useState('wptas');

  return (
    <div className='page-wrapper'>
      <div className={`${classes.backdrop} ${classes[testType === 'wptas' ? 'wptasBackdrop' : 'absBackdrop']}`}></div>
      <div className={`page dashboard ${classes.page}`}>
        <Header testType={testType} setTestType={setTestType} />
        <ResultsCard>
          <WPTASTable />
        </ResultsCard>
      </div>
    </div>
  )
});