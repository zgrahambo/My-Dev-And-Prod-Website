import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { parse } from 'query-string';
import store from '../store';

import { windowLoc } from '../util/site';
import appStyle from './PlaylistAnalyzerApp.module.scss';
import AnalyzerHeader from '../components/AnalyzerHeader/AnalyzerHeader';
import LoginOrDemo from '../components/LoginOrDemo/LoginOrDemo';
import PlaylistPicker from '../components/PlaylistPicker/PlaylistPicker';
import AnalyzerPage from '../components/AnalyzerPage/AnalyzerPage';
import ErrorBoundary from '../components/error-handling/ErrorBoundary';

class PlaylistAnalyzerApp extends Component {
  getAccessToken() {
    const hash = parse(windowLoc.hash);
    return (hash && hash.access_token);
  }

  render() {
    const accessToken = this.getAccessToken();
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Container className={appStyle.container} >
            <AnalyzerHeader>
              Spotify Playlist Analyzer
            </AnalyzerHeader>
            <ErrorBoundary>
              <Route exact path='/spa' render={(props) => {
                return <LoginOrDemo token={accessToken}/>
              }}/>
              <Route path='/spa/choose-playlist' render={(props) => {
                return <PlaylistPicker token={accessToken}/>
              }}
              />
              <Route path='/spa/analyze-playlist' render={(props) => {
                return <AnalyzerPage token={accessToken} />
              }}
              />
            </ErrorBoundary>
            <br/>
          </Container>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default PlaylistAnalyzerApp;
