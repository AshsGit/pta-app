import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CropFree from '@material-ui/icons/CropFree';
import { Theme, withStyles } from '@material-ui/core/styles';
import { Styles } from '@material-ui/core/styles/withStyles';
import { LockOpen } from '@material-ui/icons';

const styles: Styles<Theme, any> = (theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    marginBottom: "2rem",
    padding: "0 1rem"
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  segment: {
    display: 'flex',
    padding: '1rem 0',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'var(--color-primary)',
    fontSize: 120,
    marginRight: theme.spacing(4),
  },
  line: {
    backgroundColor: '#ACACAC',
    height: '2px',
    flex: '1 0 auto'
  }
});

const DialogTitle = withStyles(styles)((props: any) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const Segment = withStyles(styles)(({ classes, children }: any) => {
  return (<div className={classes.segment}>
    {children}
  </div>)
})

const PatientCodeField = withStyles(styles)(({ classes }: any) => {
  return (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flexGrow: 1 }}>
    <span style={{ marginBottom: "1rem" }}>Enter unique patient code</span>
    <form style={{ display: 'flex' }}>
      <TextField style={{ flexGrow: 1, marginRight: "1rem" }} label="Patient code" variant="outlined" />
      <Button style={{ flexGrow: 0, color: 'var(--color-accent)', borderColor: 'var(--color-accent)'}} variant="outlined">Enter</Button>
    </form>
  </div>)
})

const Divider = withStyles(styles)(({ classes }: any) => {
  return <div style={{ display: "flex", alignItems: "center", padding: "2rem 0" }}>
    <Line/>
    <span style={{ margin: "0 0.5rem" }}>OR</span>
    <Line/>
  </div>
})

const Line = withStyles(styles)(({ classes }: any) => {
  return <div className={classes.line}/>
});

export const ExistingPatientDialog = withStyles(styles)(({ classes, open, onClose }: any) => {
  return (
    <Dialog fullWidth={true} open={open} onClose={onClose} aria-labelledby="simple-dialog-title">
      <DialogTitle onClose={onClose}>
        {/* Existing Patient */}
      </DialogTitle>
      <DialogContent>
        <div className={classes.container}>
          <Segment>
            <CropFree className={classes.icon} />
            <div>Open device scanner and scan QR code</div>
          </Segment>
          <Divider/>
          <Segment>
            <LockOpen className={classes.icon} />
            <PatientCodeField></PatientCodeField>
          </Segment>
        </div>
      </DialogContent>
    </Dialog>
  )
});