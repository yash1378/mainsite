import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import React from "react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      session={pageProps.session}
    >
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
    </SessionProvider>
  )
}
