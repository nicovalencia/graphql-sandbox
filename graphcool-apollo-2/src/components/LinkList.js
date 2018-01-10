import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

class LinkList extends React.Component {

  render() {

    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return <div>Loading...</div>;
    }

    if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
      return <div>Error!</div>;
    }

    return (
      <div>
        {this.props.allLinksQuery.allLinks.map((link, index) => (
          <Link
            link={link}
            index={index}
            updateStoreAfterVote={this._updateCacheAfterVote}
            key={link.id} />
        ))}
      </div>
    );

  }

  _updateCacheAfterVote = (store, createVote, linkId) => {

    const data = store.readQuery({ query: ALL_LINKS_QUERY });
    const votedLinks = data.allLinks.find(link => link.id === linkId);
    votedLinks.votes = createVote.link.votes;

    store.writeQuery({ query: ALL_LINKS_QUERY, data });
  }

}

const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      updatedAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(LinkList);
