import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { muiTheme } from '@/theme/muiTheme'

import "@fontsource/poppins"
import "@/css/global.css"

// const muiTheme = createTheme({
//   typography:{
//     fontFamily:['Poppins','sans-serif'].join(',')
//   }
// })

export default function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <ThemeProvider theme={muiTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}