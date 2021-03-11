import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ExistingPatientDialog = ({open, onClose}: {open: boolean, onClose: any}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">Existing Patient</DialogTitle>
    </Dialog>
  )
}