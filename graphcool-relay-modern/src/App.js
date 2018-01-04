import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListPage from './ListPage';
import {
  QueryRenderer,
  graphql
} from 'react-relay';
import environment from './Environment';

const AppQuery = graphql`
  query AppQuery {
    viewer {
      ...ListPage_viewer
    }
  }
`;

class App extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={AppQuery}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return <ListPage viewer={props.viewer} />
          }
          return <div>Loading...</div>
        }}
      />
    );
  }
}

export default App;
