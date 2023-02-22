import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { muiTheme } from '@/theme/muiTheme'

import "@fontsource/poppins"
import "@/css/global.css"

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}