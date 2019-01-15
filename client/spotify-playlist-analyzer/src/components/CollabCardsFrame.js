import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, CardGroup } from 'semantic-ui-react'
import Error from './error-handling/Error';
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
    const name = this.props.playlistInfo && this.props.playlistInfo.name;
    const cards = this.createCards();
    const collaborators = this.props.collaborators;
    console.log("rEnDeRiNg CollabCardsFrame");
    console.log(collaborators);

    const maxPerRow = 5;
    const numCardsPerRow = Object.keys(collaborators).length % (maxPerRow+1);
    if (this.props.error) {
      return <Error msg={this.props.error.msg} />;
    }
    return (
      <div>
        <Header textAlign="center" as="h2">{name !== null ? "Analyzing Playlist: \"" +  name + "\"": ''}</Header>
        <CardGroup itemsPerRow={numCardsPerRow > 0 ? numCardsPerRow : 1}>
          { cards }
        </CardGroup>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  playlistInfo: state.playlistInfo.playlistInfo,
  collaborators: state.playlistInfo.collaborators,
  loading: state.playlistInfo.loading,
  error: state.playlistInfo.error,
  collabInfoLoaded: state.playlistInfo.collabInfoLoaded,
  collabAwardsLoaded: state.playlistInfo.collabAwardsLoaded
});

export default connect(mapStateToProps, {}) (CollabCardsFrame);