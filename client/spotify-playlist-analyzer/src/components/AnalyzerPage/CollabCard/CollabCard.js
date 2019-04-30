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
    console.log("test", this.props.id);
    //const awardsArray = this.props.awards;
    const color = this.props.color;
    const cardColor = color && this.props.active ? color : "grey";
    const image = this.props.image ? this.props.image : defaultProfilePic;
    let awards = [];
    // for (let i = 0; i <awardsArray.length; i++) {
    //   awards.push(<p key={awardsArray[i].icon}>
    //                 <Icon name={awardsArray[i].icon} size='small'/>
    //                 <span>{awardsArray[i].text}</span>
    //               </p>)
    // }

    return (
      <Card link className={ccStyle.card_border} style={{borderColor: cardColor}} onClick={this.handleClick}>
        <Segment style={{marginBottom: 0}} basic>
          <Image className={ccStyle.center_img} style={{borderColor: cardColor}} width='200' height='200' circular src={image} wrapped/>
        </Segment>
        <Card.Content>
          <Card.Header>{ this.props.name }</Card.Header>
          <Card.Meta> Added { this.props.numTracksAdded } tracks </Card.Meta>
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
  name: state.collabInfo.collaborators[props.id] && state.collabInfo.collaborators[props.id].name,
  image: state.collabInfo.collaborators[props.id] && state.collabInfo.collaborators[props.id].img,
  numTracksAdded: state.collabInfo.collaborators[props.id] && state.collabInfo.collaborators[props.id].name,
  color: state.collabInfo.collaborators[props.id] && state.collabInfo.collaborators[props.id].primaryColor
});

export default connect(mapStateToProps, { toggleActiveCollaborator }) (CollabCard);