import React, { useState } from 'react';
import { HomeCard } from '../layout/HomeCard';
import { NewPatientDialog } from '../dialogs/NewPatientDialog';
import { ExistingPatientDialog } from '../dialogs/ExistingPatientDialog';
import '../../App.css';
import { Theme, withStyles } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';

const styles: Styles<Theme, any> = (theme: any) => ({
  [theme.breakpoints.down('xs')]: {
    homeWrapper: {
      display: 'flex',
      flexDirection: 'column',
      '&>:not(:last-child)': {
        marginBottom: '1rem',
      }
    }
  },
  [theme.breakpoints.up('sm')]: {
    homeWrapper: {
      display: 'flex',
      '&>:not(:last-child)': {
        marginRight: '1rem',
      }
    }
  }
});

export const Home = withStyles(styles)(({ classes }: any) => {
  const [dialogState, setDialogState] = useState({ newDialog: false, existingDialog: false });

  const openNewPatientDialog = () => {
    setDialogState({ ...dialogState, newDialog: true });
  }

  const openExistingPatientDialog = () => {
    setDialogState({ ...dialogState, existingDialog: true });
  }

  const closeNewPatientDialog = () => {
    setDialogState({ ...dialogState, newDialog: false });
  }

  const closeExistingPatientDialog = () => {
    setDialogState({ ...dialogState, existingDialog: false });
  }

  return (
    <div className={`page home-page ${classes.homeWrapper}`}>
      <HomeCard variant="new" openDialogFn={openNewPatientDialog}></HomeCard>
      <HomeCard variant="existing" openDialogFn={openExistingPatientDialog}></HomeCard>
      <NewPatientDialog open={dialogState.newDialog} onClose={closeNewPatientDialog} />
      <ExistingPatientDialog open={dialogState.existingDialog} onClose={closeExistingPatientDialog} />
    </div>
  )
});  