import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, Grid, Menu, Image } from 'semantic-ui-react';
import ppStyle from './PlaylistPicker.module.scss';

import { fetchPlaylists, fetchPlaylistInfo, loadDemoPlaylists, startAnalyzerDemo } from '../../actions/spotifyActionCreators';
import Error from '../error-handling/Error/Error';
import loading_gif from '../../img/loading.gif';

class PlaylistPicker extends Component {
  constructor(props) {
    super(props);

    if (this.props.demo) {
      this.props.loadDemoPlaylists();
    } else {
      this.props.fetchPlaylists(this.props.token);
    }
  }

  handleClick(e, playlistInfo) {
    if (this.props.demo) {
      this.props.startAnalyzerDemo(playlistInfo);
    } else {
      this.props.fetchPlaylistInfo(this.props.token, playlistInfo);
    }
  }

  extractCollabPlaylists() {
    const playlists = this.props.playlists;
    if (playlists) {
      let menuItems = [];
      for (let i = 0; i < playlists.length; i++) {
        if (playlists[i].collaborative)
          menuItems.push(<Menu.Item onClick={(e) => this.handleClick(e, playlists[i])} key={playlists[i].id} as='a' name={playlists[i].name}>{playlists[i].name}</Menu.Item>);
      }
      return menuItems;
    }
    return playlists;
  }

  render() {
    const error = this.props.error;
    if (error) {
      return <Error msg={error.msg} link={error.link} linkText={error.linkText}/>;
    }
    if (this.props.playlistChosen && !this.props.loading) {
      return <Redirect to='/spa/analyze-playlist' />
    }

    let menuItems = this.extractCollabPlaylists();
    let loadingSpinner = this.props.loading && <Image src={loading_gif} centered/>;
    return (!this.props.playlistChosen &&
      <div>
        <Header className={ppStyle['offset-header']} textAlign="center" as="h2"> Choose a playlist:</Header>
        <Grid centered>
          <Grid.Column width={10}>
            {!this.props.loading && <Menu inverted fluid vertical>
              <Menu.Item header>Collaborative Playlists</Menu.Item>
              {menuItems}
            </Menu> }
            {loadingSpinner}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.playlists.playlists,
  loading: state.playlists.loading,
  error: state.playlists.error,
  demo: state.playlists.demo,
  playlistChosen: state.playlistInfo.playlistChosen
});

export default connect(mapStateToProps, { fetchPlaylists, fetchPlaylistInfo, loadDemoPlaylists, startAnalyzerDemo})(PlaylistPicker);