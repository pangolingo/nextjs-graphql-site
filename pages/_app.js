import React from 'react'
import App, { Container } from 'next/app'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import Header from '../components/Header';
import { clearToken } from '../helpers/Auth';

class CustomApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {}

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }

  //   return { pageProps }
  // }

  logout = () => {
    clearToken();
    this.props.apolloClient.resetStore();
  }

  render () {
    const { Component, pageProps, apolloClient } = this.props

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Header logout={this.logout} />
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(CustomApp)