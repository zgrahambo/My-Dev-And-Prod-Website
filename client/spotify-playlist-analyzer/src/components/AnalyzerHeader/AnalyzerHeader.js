import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Grid, Button, Icon, Menu } from 'semantic-ui-react';
import headerStyle from './AnalyzerHeader.module.scss'

import { fetchPlaylists, fetchPlaylistInfo } from '../../actions/spotifyActions';

class AnalyzerHeader extends Component {
  handleClick(e, playlistInfo) {
  }

  render() {
    return (
      <Menu className={headerStyle.appHeader} fluid>
        <Menu.Item>
          <Header as="h1">
            { this.props.children }
          </Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button animated="fly left" className={headerStyle.chooseDiffPlaylist}>
              <Button.Content visible>Choose a Different Playlist</Button.Content>
              <Button.Content hidden><Icon name="arrow left"/></Button.Content>
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Grid.Column width={3}>
              <Button>Homepage</Button>
            </Grid.Column>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default connect(null, { fetchPlaylists, choosePlaylist: fetchPlaylistInfo })(AnalyzerHeader);