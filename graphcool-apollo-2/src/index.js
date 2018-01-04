import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import secrets from './secrets.json';

if (!secrets || !secrets.SIMPLE_API) {
  throw new Error('Please configure SIMPLE_API in secrets.json!');
}

const httpLink = new HttpLink({ uri: secrets.SIMPLE_API });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(

  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>

, document.getElementById('root'));

registerServiceWorker();
