import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createContext } from 'react'
import AuthClient from './AuthClient'
import React from 'react'

export const loggedInContext = createContext({
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => {}
})

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = React.useState(false)

  return (
    <>
      <Head>
        <title>Schedulo</title>
        <meta name="description" content="Plánovač služeb pro nemocnice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <loggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
        <loggedInContext.Consumer>
          {loggedIn => (
            <AuthClient isLoggedIn={loggedIn.loggedIn}>
              <Component {...pageProps} />
            </AuthClient>
          )}
        </loggedInContext.Consumer>
      </loggedInContext.Provider>
    </>
  )
}

export default MyApp
