import React, { Component } from 'react';
import { Container, Header, Divider } from 'semantic-ui-react'
import PlaylistPicker from './components/PlaylistPicker'
import CollabCardsFrame from './components/CollabCardsFrame';
import CollabChart from './components/CollabChart';

import { Provider } from 'react-redux';
import store from './store';

class PlaylistAnalyzerApp extends Component {
  constructor(props) {
    super(props);
  }

  getAccessToken() {
    const hash = window.location.hash.substr(1);
    const result = hash.split('&').reduce(function (result, item) {
      const parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});

    return (result && result.access_token);
  }

  sendUserToSpotifyAuthorize() {
    const clientID = "9e240701125547c69d71dce42a0c120b";
    const response_type = "token";
    const redirect_uri = window.location.href;
    const scope = "playlist-read-private playlist-read-collaborative";

    let spotifyURI = "https://accounts.spotify.com/authorize?"
      + "client_id=" + clientID + "&response_type=" + response_type
      + "&redirect_uri=" + redirect_uri + "&scope=" + scope;

    window.location.replace(encodeURI(spotifyURI));
  }

  render() {
    const accessToken = this.getAccessToken();
    if (!accessToken)
      this.sendUserToSpotifyAuthorize();
    else {
      return (
        <Provider store={store}>
          <Container>
            <br/>
            <Header textAlign="center" as="h1">
              Spotify Collaborative Playlist Analyzer
            </Header>
            <PlaylistPicker token={ accessToken } />
            <CollabCardsFrame token={ accessToken } />
            <CollabChart token={ accessToken } />
            <br/>
            <Divider />
          </Container>
        </Provider>
      );
    }
  }
}

export default PlaylistAnalyzerApp;
