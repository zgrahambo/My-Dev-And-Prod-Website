import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadDemoPlaylists } from '../../actions/spotifyActionCreators';

import { windowLoc } from '../../util/site';

import { Grid, Button } from 'semantic-ui-react';
import Error from '../error-handling/Error/Error';

const LOGIN_TYPE = 'login'
const DEMO_TYPE = 'demo';

class PlaylistPicker extends Component {

  sendUserToSpotifyAuthorize() {
    const clientID = "9e240701125547c69d71dce42a0c120b";
    const response_type = "token";
    const redirect_uri = windowLoc.href;
    const scope = "playlist-read-private playlist-read-collaborative";

    let spotifyURI = "https://accounts.spotify.com/authorize?"
      + "client_id=" + clientID + "&response_type=" + response_type
      + "&redirect_uri=" + redirect_uri + "&scope=" + scope;

    windowLoc.replace(encodeURI(spotifyURI));
  }

  handleClick = (e, type) => {
    switch(type) {
      case LOGIN_TYPE:
        this.sendUserToSpotifyAuthorize();
        return;
      case DEMO_TYPE:
        this.props.loadDemoPlaylists();
        return;
      default:
        return;
    }
  }

  render() {
    const error = this.props.error;
    if (error) {
      return <Error msg={error.msg} link={error.link} linkText={error.linkText}/>;
    }

    if (this.props.token || this.props.demo) {
      return (<Redirect to='/spa/choose-playlist'/>);
    }
    else {
      return (
        <Grid centered>
          <Grid.Column textAlign="center" width={10}>
            <Button.Group>
              <Button onClick={(e) => this.handleClick(e, LOGIN_TYPE)} positive>Login to Analyzer Your Playlists</Button>
              <Button.Or />
              <Button disabled onClick={(e) => this.handleClick(e, DEMO_TYPE)}>Demo Playlist</Button>
            </Button.Group>
          </Grid.Column>
        </Grid>
      );
    }
  }
}

const mapStateToProps = state => ({
  playlistChosen: state.playlistInfo.playlistChosen,
  demo: state.playlists.demo
});

export default connect(mapStateToProps, { loadDemoPlaylists })(PlaylistPicker);