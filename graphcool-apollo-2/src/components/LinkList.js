import React from 'react';
import Link from './Link';

class LinkList extends React.Component {
  render() {

    const links = [{
      id: '1',
      description: 'Graphcool 😎',
      url: 'https://www.graph.cool'
    }, {
      id: '2',
      description: 'Apollo',
      url: 'http://dev.apollodata.com/'
    }];

    return (
      <div>
        {links.map(link => (
          <Link link={link} key={link.id} />
        ))}
      </div>
    );

  }
}

export default LinkList;
