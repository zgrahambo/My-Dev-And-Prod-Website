import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { homeUrl } from '../../util/site';
import { Header, Grid, Button, Icon, Menu } from 'semantic-ui-react';
import headerStyle from './AnalyzerHeader.module.scss'

import { chooseNewPlaylist } from '../../actions/spotifyActions';

class AnalyzerHeader extends Component {
  handleClickChooseNewPlaylist() {
    this.props.history.push('/spa/choose-playlist');
    this.props.chooseNewPlaylist();
  }

  render() {
    return (
      <Menu className={headerStyle['no-box-shadow']} fixed="top">
        <Menu.Item>
          <Header as="h1">
            { this.props.children }
          </Header>
        </Menu.Item>
        <Menu.Menu position="right">
          {this.props.playlistChosen && 
          <Menu.Item>
            <Button onClick={() => this.handleClickChooseNewPlaylist()} animated className={headerStyle.chooseDiffPlaylist}>
              <Button.Content visible>Choose a Different Playlist</Button.Content>
              <Button.Content hidden><Icon name="arrow left"/></Button.Content>
            </Button>
          </Menu.Item>}
          <Menu.Item>
            <Grid.Column width={3}>
              <Button href={homeUrl}>Homepage</Button>
            </Grid.Column>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  playlistChosen: state.playlistInfo.playlistChosen
});

export default withRouter(connect(mapStateToProps, { chooseNewPlaylist })(AnalyzerHeader));