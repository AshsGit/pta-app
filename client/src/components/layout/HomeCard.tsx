import React from 'react';
import Button from '@material-ui/core/Button';
import './HomeCard.css';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Backup from '@material-ui/icons/Backup';

export const HomeCard = ({ variant, openDialogFn }: { variant: 'new' | 'existing', openDialogFn: Function }) => {
  let icon, button;
  if (variant === 'new') {
    icon = <PersonAdd style={{ color: 'var(--color-primary)', fontSize: 80 }} />;
    button = <Button variant="contained" onClick={() => { openDialogFn() }}>Create</Button>
  } else if (variant === 'existing') {
    icon = <Backup style={{ color: 'var(--color-primary)', fontSize: 80 }} />;
    button = <Button variant="contained" onClick={() => { openDialogFn() }}>Scan</Button>
  }
  return (
    <div className="card">
      <div className="body">
        {icon}
        <span className="label">
          {(variant === "new" ? "New" : "Existing") + " Patient"}
        </span>
      </div>
      {button}
    </div>
  )
}