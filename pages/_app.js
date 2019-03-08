import React from 'react'
import App, { Container } from 'next/app'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'

class CustomApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {}

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }

  //   return { pageProps }
  // }

  render () {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(CustomApp)