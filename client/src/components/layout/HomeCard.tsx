import React from 'react';
import Button from '@material-ui/core/Button';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Backup from '@material-ui/icons/Backup';
import { Styles } from '@material-ui/core/styles/withStyles';
import { Theme, withStyles } from '@material-ui/core/styles';

const styles: Styles<Theme, any> = (theme: any) => ({
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
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
    padding: "1.5rem",
    boxShadow: "0 40px 30px -20px rgba(0,0,0,0.25)"
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
  actionButton: {
    backgroundColor: 'var(--color-accent)',
    color: 'white',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'var(--color-accent)',
      color: '#FFF'
    }
  },
});

const Card = withStyles(styles)((props: any) => {
  const { children, classes, variant, openDialogFn, ...other } = props;

  let icon, button;
  if (variant === 'new') {
    icon = <PersonAdd className={classes.icon}/>;
    button = <Button className={classes.actionButton} variant="contained" onClick={() => { openDialogFn() }}>Create</Button>
  } else if (variant === 'existing') {
    icon = <Backup className={classes.icon}/>;
    button = <Button variant="contained" className={classes.actionButton} onClick={() => { openDialogFn() }}>Scan</Button>
  }

  return (
    <div className={classes.card}>
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

export const HomeCard = ({ variant, openDialogFn }: { variant: 'new' | 'existing', openDialogFn: Function }) => {
  return (
    <Card variant={variant} openDialogFn={openDialogFn}></Card>
  )
}