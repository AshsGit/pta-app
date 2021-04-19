import React from 'react';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Backup from '@material-ui/icons/Backup';
import { Styles } from '@material-ui/core/styles/withStyles';
import { Theme, withStyles } from '@material-ui/core/styles';
import { FilledButton } from './Buttons';

const styles: Styles<Theme, any> = (theme: any) => ({
  card: {
    width: "50%",
    minWidth: "200px",
    maxWidth: "300px",
    height: "50vh",
    minHeight: "250px",
    maxHeight: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: "20px",
    fontWeight: 500,
  },
  body: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: '1rem'
  },
  icon: {
    color: 'var(--color-primary)',
    fontSize: 80
  },
});

const Card = withStyles(styles)((props: any) => {
  const { children, classes, variant, openDialogFn, ...other } = props;

  let icon, button;
  if (variant === 'new') {
    icon = <PersonAdd className={classes.icon}/>;
    button = <FilledButton variant="contained" onClick={() => { openDialogFn() }}>Create</FilledButton>
  } else if (variant === 'existing') {
    icon = <Backup className={classes.icon}/>;
    button = <FilledButton variant="contained" onClick={() => { openDialogFn() }}>Scan</FilledButton>
  }

  return (
    <div {...other} className={`card ${classes.card}`}>
      <div className={classes.body}>
        {icon}
        <span className={classes.label}>
          {(variant === "new" ? "New" : "Existing") + " Patient"}
        </span>
      </div>
      {button}
    </div>
  );
});

export const HomeCard = withStyles(styles)(({ classes, variant, openDialogFn }: any) => {
  return (
      <Card variant={variant} openDialogFn={openDialogFn}></Card>
  )
});