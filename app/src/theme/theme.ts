import { createTheme } from '@suid/material';

export const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif"
  },
  palette: {
    primary: {
      main: '#221919'
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F'
    },
    text: {
      primary: '#221919',
      secondary: '#746F6F'
    }
  }
});
