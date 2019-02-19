import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleActiveCollaborator } from '../../actions/individualCollabActions';

import { Card, Segment, Image, Icon } from 'semantic-ui-react';
import ccStyle from './CollabCard.module.scss';

class CollabCard extends Component {
  handleClick = () => {
    this.props.toggleActiveCollaborator(this.props.id);
  }

  render() {
    const awardsArray = this.props.awards;
    const color = this.props.color;
    const cardColor = color && this.props.active ? color : "grey";
    let awards = [];
    for (let i = 0; i <awardsArray.length; i++) {
      awards.push(<p key={awardsArray[i].icon}>
                    <Icon name={awardsArray[i].icon} size='small'/>
                    <span>{awardsArray[i].text}</span>
                  </p>)
    }

    return (
      <Card link className={ccStyle.card_border} style={{borderColor: cardColor}} onClick={this.handleClick}>
        <Segment style={{marginBottom: 0}} basic>
          <Image className={ccStyle.center_img} style={{borderColor: cardColor}} width='200' height='200' circular src={this.props.img} wrapped/>
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
  active: state.activeCollab.activeCollaborators[props.id]
});

export default connect(mapStateToProps, { toggleActiveCollaborator }) (CollabCard);