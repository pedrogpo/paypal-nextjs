import '~/styles/global.css'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import React, { ReactNode } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPage & { Layout?: ReactNode } }) {
  // Need to set the client_id in .env
  // .env => SANDBOX_PAYPAL_CLIENT_ID=CLIENT_ID
  // .env => PRODUCTION_PAYPAL_CLIENT_ID=>CLIENT_ID

  const client_id =
    process.env.NODE_ENV == 'development'
      ? process.env.SANDBOX_PAYPAL_CLIENT_ID
      : process.env.PRODUCTION_PAYPAL_CLIENT_ID

  if (!client_id) {
    throw new Error('PAYPAL_CLIENT_ID is not setted')
  }

  return (
    <PayPalScriptProvider options={{ 'client-id': client_id!, currency: 'BRL' }}>
      <Component {...pageProps} />
    </PayPalScriptProvider>
  )
}

export default App
