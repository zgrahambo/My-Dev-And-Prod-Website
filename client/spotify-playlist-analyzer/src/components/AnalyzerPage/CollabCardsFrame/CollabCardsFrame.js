import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, CardGroup, Image } from 'semantic-ui-react';
import Error from '../../error-handling/Error/Error';
import CollabCard from '../CollabCard/CollabCard';

import loading_gif from '../../../img/loading.gif';
import defaultProfilePic from '../../../img/defaultProfilePic.png';

class CollabCardsFrame extends Component {

  createCards() {
    let cards = [];
    const collaboratorsModel = this.props.collaboratorsModel;
    const collaborators = collaboratorsModel.collaborators,
      collabInfoLoaded = this.props.collabInfoLoaded,
      collabAwardsLoaded = this.props.collabAwardsLoaded;
    let currentCollaborator, img, name, color, awards;

    collaboratorsModel.order.forEach((id) => {
      currentCollaborator = collaborators[id]; 
      img = collabInfoLoaded ? currentCollaborator.img : defaultProfilePic;
      name = collabInfoLoaded ? currentCollaborator.name : 'Unknown User';
      color = collabInfoLoaded ? currentCollaborator.primaryColor : "";
      awards = collabAwardsLoaded ? currentCollaborator.awards.awardList : [];
      cards.push(<CollabCard key={"card"+id} id={id} numTracksAdded={currentCollaborator.getNumTracks()}
                              img={img} name={name} awards={awards} color={color}/>);
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
        <Header textAlign="center" as="h2">{name ? "Analyzing Playlist: \"" +  name + "\"": ''}</Header>
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
  collaboratorsModel: state.collabInfo.collaboratorsModel,
  collabInfoLoaded: state.collabInfo.collabInfoLoaded,
  collabAwardsLoaded: state.collabInfo.collabAwardsLoaded
});

export default connect(mapStateToProps, {}) (CollabCardsFrame);