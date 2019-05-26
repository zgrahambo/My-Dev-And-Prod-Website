import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { homeUrl } from '../../util/site';
import { Header, Grid, Button, Icon, Menu } from 'semantic-ui-react';
import headerStyle from './AnalyzerHeader.module.scss'

import { chooseNewPlaylist, restartApp } from '../../actions/spotifyActionCreators';

class AnalyzerHeader extends Component {
  handleClickChooseNewPlaylist() {
    this.props.history.push({
      pathname: "/spa/choose-playlist"
    });
    
    this.props.chooseNewPlaylist();
  }

  handleClickLoginOrDemo() {
    this.props.history.push({
      pathname: "/spa"
    });
    this.props.restartApp();
  }

  render() {
    const loggedIn = this.props.loggedIn;
    const demo = this.props.demo;
    return (
      <Menu className={headerStyle['no-box-shadow']} fixed="top">
        <Menu.Item>
          <Header as="h1">
            { this.props.children }
          </Header>
        </Menu.Item>
        <Menu.Menu position="right">
          {(loggedIn || demo) && 
            <Menu.Item>
              <Button onClick={() => this.handleClickLoginOrDemo()} animated className={headerStyle.loginOrDemo}>
                {loggedIn && <Button.Content visible>Demo</Button.Content>}
                {demo && <Button.Content visible>Login</Button.Content>}
                <Button.Content hidden><Icon name="arrow left"/></Button.Content>
              </Button>
            </Menu.Item>
          }
          {this.props.playlistChosen && 
            <Menu.Item>
              <Button onClick={() => this.handleClickChooseNewPlaylist()} animated className={headerStyle.chooseDiffPlaylist}>
                <Button.Content visible>Choose Playlist</Button.Content>
                <Button.Content hidden><Icon name="arrow left"/></Button.Content>
              </Button>
            </Menu.Item>
          }
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
  loggedIn: state.playlists.loggedIn,
  demo: state.playlists.demo,
  playlistChosen: state.playlistInfo.playlistChosen
});

export default withRouter(connect(mapStateToProps, { chooseNewPlaylist, restartApp })(AnalyzerHeader));