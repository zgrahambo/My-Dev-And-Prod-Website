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
    const borderColor = color && this.props.active ? color : "grey"; //(color && this.props.active ? "2px " + color + " solid" : "2px grey solid");
    let awards = [];
    for (let i = 0; i <awardsArray.length; i++) {
      awards.push(<p key={awardsArray[i].icon}>
                    <Icon name={awardsArray[i].icon} size='small'/>
                    <span>{awardsArray[i].text}</span>
                  </p>)
    }

    return (
      <Card link className={ccStyle.card_border} style={{borderColor: borderColor}} onClick={this.handleClick}>
        <Segment style={{marginBottom: 0}} basic>
          <Image className={ccStyle.center_img} width='200' height='200' circular src={this.props.img} wrapped/>
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