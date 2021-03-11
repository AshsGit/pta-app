import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

export const NewPatientDialog = ({open, onClose}: {open: boolean, onClose: any}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">New Patient</DialogTitle>
    </Dialog>
  )
}