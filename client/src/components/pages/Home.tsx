import React, { useState } from 'react';
import { HomeCard } from '../layout/HomeCard';
import { NewPatientDialog } from '../dialogs/NewPatientDialog';
import { ExistingPatientDialog } from '../dialogs/ExistingPatientDialog';
import '../../App.css';
import './Home.css';

export const Home = () => {
  const [dialogState, setDialogState] = useState({ newDialog: false, existingDialog: false });

  const openNewPatientDialog = () => {
    setDialogState({...dialogState, newDialog: true});
  }

  const openExistingPatientDialog = () => {
    setDialogState({...dialogState, existingDialog: true});
  }

  const closeNewPatientDialog = () => {
    setDialogState({...dialogState, newDialog: false});
  }

  const closeExistingPatientDialog = () => {
    setDialogState({...dialogState, existingDialog: false});
  }

  return (
    <div className="page home-wrapper">
      <HomeCard variant="new" openDialogFn={openNewPatientDialog}></HomeCard>
      <HomeCard variant="existing" openDialogFn={openExistingPatientDialog}></HomeCard>

      <NewPatientDialog open={dialogState.newDialog} onClose={closeNewPatientDialog} />
      <ExistingPatientDialog open={dialogState.existingDialog} onClose={closeExistingPatientDialog} />
    </div>
  )
}  