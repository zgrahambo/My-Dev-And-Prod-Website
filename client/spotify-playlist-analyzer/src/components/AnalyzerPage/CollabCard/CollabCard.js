import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleActiveCollaborator } from '../../../actions/individualCollabActions';

import { Card, Segment, Image, Placeholder, Icon } from 'semantic-ui-react';
import ccStyle from './CollabCard.module.scss';
import defaultProfilePic from '../../../img/defaultProfilePic.png';

class CollabCard extends Component {
  handleClick = () => {
    this.props.toggleActiveCollaborator(this.props.id);
  }

  render() {
    const collaborator = this.props.collaborator;
    if (!collaborator) {
      return null;
    }
    const awardsArray = collaborator.awards && collaborator.awards.awardList;
    const name = collaborator.name ? collaborator.name : "Unknown";
    const color = collaborator.primaryColor;
    const image = collaborator.img ? collaborator.img : defaultProfilePic;
    const cardColor = color && this.props.active ? color : "grey";
    const numTracksAdded = collaborator.trackIds && collaborator.trackIds.length ? collaborator.trackIds.length : "?";
    let awards = [];
    if (awardsArray) {
      for (let i = 0; i <awardsArray.length; i++) {
        awards.push(<p key={awardsArray[i].icon}>
                      <Icon name={awardsArray[i].icon} size='small'/>
                      <span>{awardsArray[i].text}</span>
                    </p>)
      }
    }
    return (
      <Card link className={ccStyle.card_border} style={{borderColor: cardColor}} onClick={this.handleClick}>
        <Segment style={{marginBottom: 0}} basic>
          <Image className={ccStyle.center_img} style={{borderColor: cardColor}} width='200' height='200' circular src={image} wrapped/>
        </Segment>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta> Added {numTracksAdded} tracks </Card.Meta>
          <Card.Description>
            { awards }
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state, props) => ({
  active: state.activeCollab.activeCollaborators[props.id],
  // collaborator info:
  collaborator: state.collabInfo.collaborators[props.id]
});

export default connect(mapStateToProps, { toggleActiveCollaborator }) (CollabCard);