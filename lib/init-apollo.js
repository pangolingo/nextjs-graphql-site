import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

const httpLink = new HttpLink({
  // uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
  // credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
  uri: 'http://localhost:4000/graphql'
});

const getAuthLink = getToken => {
  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    console.log('using auth token', token)
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  });

  return authLink;
}


// NOTE: the named ApolloClient import from apollo-boost doesn't actually export the Apollo Boost version of hte client
// so don't look at the Apollo Boost docs for new ApolloClient
function create (initialState, { getToken }) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: getAuthLink(getToken).concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
    request: async (operation) => {
      operation.setContext({
        headers: {
          authorization: 'qqqqq'
        }
      })
    }
  })
}

export default function initApollo (initialState, options = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}