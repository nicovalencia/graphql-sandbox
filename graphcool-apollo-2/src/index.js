import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import secrets from './secrets.json';
import { GC_AUTH_TOKEN } from './constants';

if (!secrets || !secrets.SIMPLE_API) {
  throw new Error('Please configure SIMPLE_API in secrets.json!');
}

if (!secrets || !secrets.SUBSCRIPTION_API) {
  throw new Error('Please configure SUBSCRIPTION_API in secrets.json!');
}

const httpLink = new HttpLink({ uri: secrets.SIMPLE_API });

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(GC_AUTH_TOKEN);
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: secrets.SUBSCRIPTION_API,
  options: {
    reconnect: true,
    connectionParams: {
      authTokens: localStorage.getItem(GC_AUTH_TOKEN),
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithAuthToken,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(

  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>

, document.getElementById('root'));

registerServiceWorker();
