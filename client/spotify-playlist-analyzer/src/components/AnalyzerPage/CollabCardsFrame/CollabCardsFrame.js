import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, CardGroup, Image } from 'semantic-ui-react';
import ccfStyle from './CollabCardsFrame.module.scss';
import Error from '../../error-handling/Error/Error';
import CollabCard from '../CollabCard/CollabCard';

import loading_gif from '../../../img/loading.gif';

class CollabCardsFrame extends Component {

  createCards() {
    let cards = [];
    this.props.collaboratorIds.forEach((collaboratorId) => {
      cards.push(<CollabCard key={"card_"+collaboratorId} id={collaboratorId}/>)
    });
    return cards;
  }

  render() {
    if (this.props.error) {
      return <Error msg={this.props.error} />;
    }
    if (this.props.loading) {
      return <Image src={loading_gif} centered/>;
    }

    const name = this.props.playlistName;
    const cards = this.createCards();
    //const numOfCollaborators = this.props.collaboratorsModel.order.length;

    const numCardsPerRow = 5;

    return (
      <div>
        <Header className={ccfStyle['offset-header']} textAlign="center" as="h2">{name ? "Playlist \"" +  name + "\" Analysis": ''}</Header>
        <CardGroup centered itemsPerRow={numCardsPerRow}>
          { cards }
        </CardGroup>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  playlistName: state.playlistInfo.playlistName,
  loading: state.playlistInfo.loading,
  error: state.playlistInfo.error,
  collaboratorIds: state.collabInfo.orderedCollaborators
});

export default connect(mapStateToProps, {}) (CollabCardsFrame);