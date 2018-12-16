import React, { Component } from 'react';
import { Container, Header, Divider } from 'semantic-ui-react'
import PlaylistPicker from './components/PlaylistPicker'
import CollabCardsFrame from './components/CollabCardsFrame';

import { Provider } from 'react-redux';
import store from './store';

class PlaylistAnalyzerApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <br/>
          <Header textAlign="center" as="h1">
            Spotify Collaborative Playlist Analyzer
          </Header>
          <PlaylistPicker token={ this.props.token } />
          <CollabCardsFrame token={ this.props.token }>
            {/*<Card/>*/}
          </CollabCardsFrame>
          <br/>
          <Divider />
        </Container>
      </Provider>
    );
  }
}

export default PlaylistAnalyzerApp;
