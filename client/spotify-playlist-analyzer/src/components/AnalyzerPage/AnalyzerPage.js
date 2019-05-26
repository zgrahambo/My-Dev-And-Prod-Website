import React, { Component } from 'react';

import CollabCardsFrame from './CollabCardsFrame/CollabCardsFrame';
import CollabChart from './CollabChart/CollabChart';

class AnalyzerPage extends Component {
  render() {
    return (
      <div id="analyzer_page">
        <CollabCardsFrame/>
        <CollabChart/>
      </div>
    );
  }
}

export default AnalyzerPage;