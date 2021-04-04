import React from 'react';
import Button from '@material-ui/core/Button';
import { Styles } from '@material-ui/core/styles/withStyles';
import { Theme, withStyles } from '@material-ui/core/styles';

const styles: Styles<Theme, any> = (theme: any) => ({
  filledButton: {
    color: 'white !important',
    backgroundColor: 'var(--color-accent)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'var(--color-accent-dark)',
      color: 'white',
    },
  },
  outlineButton: {
    color: 'var(--color-accent)',
    border: '2px solid var(--color-accent)',
    backgroundColor: 'transparent',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'var(--color-accent)',
      color: 'white',
    },
  },
});

export const FilledButton = withStyles(styles)(
  ({ children, classes, onClick, ...other }: any) => {
    return (
      <Button
        className={classes.filledButton}
        {...other}
        onClick={onClick}
        variant='contained'
      >
        {children}
      </Button>
    );
  }
);

export const OutlineButton = withStyles(styles)(
  ({ children, classes, onClick, ...other }: any) => {
    return (
      <Button
        className={classes.outlineButton}
        {...other}
        onClick={onClick}
        variant='outlined'
      >
        {children}
      </Button>
    );
  }
);
