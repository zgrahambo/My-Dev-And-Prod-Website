import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlaylists, fetchPlaylistInfo } from '../actions/spotifyActions';

import { Header, Grid, Menu, Image } from 'semantic-ui-react';
import Error from './Error';
import loading_gif from '../img/loading.gif';

class PlaylistPicker extends Component {
  constructor(props) {
    super(props);
    this.props.fetchPlaylists(this.props.token);
  }

  handleClick(e, playlistInfo) {
    this.props.choosePlaylist(this.props.token, playlistInfo);
  }

  extractCollabPlaylists(data) {
    if (data && data.items) {
      let menuItems = [], playlists = data.items;
      for (let i = 0; i < playlists.length; i++) {
        if (playlists[i].collaborative)
          menuItems.push(<Menu.Item onClick={(e) => this.handleClick(e, playlists[i])} key={i} as='a' name={playlists[i].name} id={playlists[i].id}>{playlists[i].name}</Menu.Item>);
      }
      return menuItems;
    }
    return data;
  }

  render() {
    console.log("RENDERING PlaylistPicker");
    const error = this.props.error;
    if (error) {
      return <Error msg={error.msg} link={error.link} linkText={error.linkText}/>;
    }

    let menuItems = this.extractCollabPlaylists(this.props.playlists);
    let loadingSpinner = this.props.loading && <Image src={loading_gif} centered/>;

    // Grid is 16 columns by default.
    return (!this.props.playlistChosen &&
      <div>
        {!this.props.loading && <Header textAlign="center" as="h2"> Choose a playlist:</Header>}
        <Grid centered>
          <Grid.Column width={10}>
            <Menu inverted fluid vertical>
              <Menu.Item header>Collaborative Playlists</Menu.Item>
              {menuItems}
            </Menu>
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
  playlistChosen: state.playlistInfo.playlistChosen
});

export default connect(mapStateToProps, { fetchPlaylists, choosePlaylist: fetchPlaylistInfo })(PlaylistPicker);