import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import "@fontsource/poppins"
import "@/css/global.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}