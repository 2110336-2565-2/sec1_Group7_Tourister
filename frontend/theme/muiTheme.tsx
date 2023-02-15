import { createTheme } from "@mui/material/styles"

export const muiTheme = createTheme({
  typography:{
    fontFamily:['Poppins','sans-serif'].join(',')
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#0277bd',
    },
    secondary: {
      main: '#d32f2f',
    },
    error: {
      main: '#d50000',
    },
  },
});