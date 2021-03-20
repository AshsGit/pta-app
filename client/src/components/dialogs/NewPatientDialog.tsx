import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Theme, withStyles } from '@material-ui/core/styles';
import { Styles } from '@material-ui/core/styles/withStyles';
import { FilledButton, OutlineButton } from '../layout/Buttons';
import qr_code from '../../assets/Example_QR_Code.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import { useHistory } from 'react-router-dom';

const styles: Styles<Theme, any> = (theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    marginBottom: "2rem",
    padding: "0 2rem"
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  confirmContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: "1.5rem",
    "&>:not(:last-child)": {
      marginBottom: "1.5rem"
    }
  },
  createPatientContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    "&>:not(:last-child)": {
      marginBottom: "1rem"
    },
    "&>*": {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    "&>:not(:last-child)": {
      marginRight: "1rem"
    },
    "&>*": {
      flex: "1 1 50%"
    }
  },
  heading: {
    textAlign: 'center',
    margin: 0,
    fontSize: "18px",
    fontWeight: 500
  },
  qrcode: {
    width: "100%",
    maxWidth: "50vh",
  },
  tick: {
    color: 'green',
    fontSize: '1rem',
  }
});

const ConfirmCreate = withStyles(styles)(({ classes, setDialogState, setPatientId, onClose }: any) => {
  function createPatient(): void {
    setDialogState('created');
    // TODO: actually create patient in backend.
    setTimeout(() => {
      setPatientId('123456789')
    }, 1000);
  }
  return (<div className={classes.confirmContainer}>
    <h3 className={classes.heading}>Create new patient?</h3>
    <div className={classes.buttonsContainer}>
      <OutlineButton onClick={createPatient}>Yes</OutlineButton>
      <OutlineButton onClick={onClose}>No</OutlineButton>
    </div>
  </div>)
});

const DialogTitle = withStyles(styles)(({ children, classes, onClose }: any) => {
  return (
    <MuiDialogTitle>
      {children}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const NewPatient = withStyles(styles)(({ classes, id }: any) => {
  const history = useHistory();

  const navigateToDashboard = () => {
    // TODO start a WPTAS test for patient
    history.push(`/dashboard/${id}`);
  };

  return (<div className={classes.createPatientContainer}>
    {id === null ? (
      <div>
        <CircularProgress />
      </div>
    ) : (
        [
          <div>
            <img className={classes.qrcode} src={qr_code} alt="QR Code" />
          </div>,
          <span>{`Unique patient code: ${id}`}</span>,
          <div className={classes.buttonsContainer}>
            <FilledButton onClick={() => { /* Save QR code */ }}>Save QR code</FilledButton>
            <FilledButton style={{width: "100%"}} onClick={navigateToDashboard}>Patient dashboard</FilledButton>
          </div>
        ]
      )}
  </div>)
});

export const NewPatientDialog = withStyles(styles)(({ classes, open, onClose }: any) => {
  const [dialogState, setDialogState] = useState("confirm"); // 'confirm', 'created'
  const [patientId, setPatientId] = useState(null);
  return (
    <Dialog maxWidth={dialogState === 'created' ? 'xs' : 'sm'} fullWidth={dialogState === 'created'} open={open} onClose={onClose} aria-label="New Patient Dialog">
      {dialogState === 'confirm' ? (
        <Dialog open={open} onClose={onClose} aria-label="New Patient Dialog">
          <ConfirmCreate setDialogState={setDialogState} setPatientId={setPatientId} onClose={onClose} />
        </Dialog>
      ) : (
          [
            <DialogTitle onClose={onClose}>
              <h3 className={classes.heading}>
                <span>
                  {patientId === null ? 'Creating new patient' : 'New patient created'}
                </span>
                {(patientId !== null && <span> <CheckIcon classes={{root: classes.tick}}/> </span>)}
              </h3>
            </DialogTitle>,
            <div className={classes.container}>
              <NewPatient id={patientId} />
            </div>
          ]
        )}
    </Dialog>
  )
});