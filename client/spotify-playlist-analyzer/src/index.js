import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import PlaylistAnalyzerApp from './PlaylistAnalyzerApp';
import * as serviceWorker from './serviceWorker';

const hash = window.location.hash.substr(1);
const result = hash.split('&').reduce(function (result, item) {
  const parts = item.split('=');
  result[parts[0]] = parts[1];
  return result;
}, {});

if (!(result && result.access_token)) {
  const clientID = "9e240701125547c69d71dce42a0c120b";
  const response_type = "token";
  const redirect_uri = window.location.href; //TODO
  const scope = "playlist-read-private playlist-read-collaborative";

  let spotifyURI = "https://accounts.spotify.com/authorize?"
    + "client_id=" + clientID + "&response_type=" + response_type
    + "&redirect_uri=" + redirect_uri + "&scope=" + scope;

  window.location.replace(encodeURI(spotifyURI));
} else {
  ReactDOM.render(<PlaylistAnalyzerApp token={result.access_token} />,
    document.getElementById('root'));
  serviceWorker.unregister();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
