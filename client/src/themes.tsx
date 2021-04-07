import { createMuiTheme } from '@material-ui/core';
import { deepOrange, blue } from '@material-ui/core/colors';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

//Modifies override type within themes
type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

export const WPTASTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: { main: '#5C88F6' },
    background: {
      default: '#E5E5E5',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '1.625rem',
      lineHeight: '1.875rem',
    },
    h2: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '1.375rem',
      lineHeight: '1.625rem',
    },
    h3: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '1.313rem',
    },
    // h4: {
    //   fontStyle: 'normal',
    //   fontWeight: 'bold',
    //   fontSize: '0.875rem',
    //   lineHeight: '1rem',
    // },
    body1: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '1rem',
      lineHeight: '1.313rem',
    },
  },
});

export const ABSTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: deepOrange[400],
      },
    },

    // MuiPickersModal: {
    //   dialogAction: {
    //     color: 'var(--color-primary)',
    //     // color: deepOrange["400"],
    //   },
    // },
  },
  palette: {
    type: 'light',
    primary: deepOrange,
    secondary: blue,
    background: {
      default: '#E5E5E5',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '1.625rem',
      lineHeight: '1.875rem',
    },
    h2: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '1.25rem',
      lineHeight: '1.4375rem',
    },
    h3: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '1.125rem',
      lineHeight: '1.313rem',
    },
    body1: {
      fontWeight: 'normal',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    body2: {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '1.5rem',
    },
  },
});
