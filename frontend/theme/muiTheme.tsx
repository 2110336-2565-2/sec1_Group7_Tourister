import { createTheme } from "@mui/material/styles"
import { COLOR } from "@/theme/globalTheme";

export const muiTheme = createTheme({
  typography:{
    fontFamily:['Poppins','sans-serif'].join(',')
  },
  palette: {
    mode: 'light',
    primary: {
      main: COLOR.primary,
    },
    secondary: {
      main: COLOR.secondary,
    },
    error: {
      main: COLOR.error,
    },
  },
});