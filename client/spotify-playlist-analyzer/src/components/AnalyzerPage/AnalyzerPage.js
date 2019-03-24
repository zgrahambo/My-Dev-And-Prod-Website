import React, { Component } from 'react';

import CollabCardsFrame from './CollabCardsFrame/CollabCardsFrame';
import CollabChart from './CollabChart/CollabChart';

class AnalyzerPage extends Component {
  render() {
    return (
      <div id="analyzer_page">
        <CollabCardsFrame token={this.props.token} />
        <CollabChart token={ this.props.token } />
      </div>
    );
  }
}

export default AnalyzerPage;