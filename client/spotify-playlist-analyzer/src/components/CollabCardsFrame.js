import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CardGroup } from 'semantic-ui-react'
import CollabCard from './CollabCard';
import defaultProfilePic from '../img/defaultProfilePic.png';

class CollabCardsFrame extends Component {

  createCards() {
    let cards = [];
    if (!this.props.loading) {
      const collaborators = this.props.collaborators,
        collabInfoLoaded = this.props.collabInfoLoaded,
        collabAwardsLoaded = this.props.collabAwardsLoaded;
      let currentCollaborator, img, name, color, awards;
      for (let i in collaborators) {
        currentCollaborator = collaborators[i]; 
        img = collabInfoLoaded ? currentCollaborator.img : defaultProfilePic;
        name = collabInfoLoaded ? currentCollaborator.name : 'Unknown User';
        color = collabInfoLoaded ? currentCollaborator.primaryColor : "";
        awards = collabAwardsLoaded ? currentCollaborator.awards.awardList : [];
        cards.push(<CollabCard key={i} numTracksAdded={currentCollaborator.getNumTracks()}
                               img={img} name={name} awards={awards} color={color}/>);
      }
    }
    return cards;
  }

  render() {
    const cards = this.createCards();
    const collaborators = this.props.collaborators;
    console.log("rEnDeRiNg CollabCardsFrame");
    console.log(collaborators);

    const maxPerRow = 5;
    const numCardsPerRow = Object.keys(collaborators).length % (maxPerRow+1);

    return (
      <CardGroup itemsPerRow={numCardsPerRow > 0 ? numCardsPerRow : 1}>
        { cards }
      </CardGroup>
    );
  }
}
const mapStateToProps = state => ({
  collaborators: state.playlistInfo.collaborators,
  loading: state.playlistInfo.loading,
  error: state.playlistInfo.error,
  collabInfoLoaded: state.playlistInfo.collabInfoLoaded,
  collabAwardsLoaded: state.playlistInfo.collabAwardsLoaded
});

export default connect(mapStateToProps, {}) (CollabCardsFrame);