import React from 'react';

class Link extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.link.description} ({this.props.link.url})</div>
      </div>
    );
  }

  _voteForLink = async () => {

  }
}

export default Link;
