import React, { Component } from 'react';
import { Card, Segment, Image, Icon } from 'semantic-ui-react'

class CollabCard extends Component {
  render() {
    const awardsArray = this.props.awards;
    let awards = [];
    for (let i = 0; i <awardsArray.length; i++) {
      awards.push(<p key={awardsArray[i].icon}>
                    <Icon name={awardsArray[i].icon} size='small'/>
                    <span>{awardsArray[i].text}</span>
                  </p>)
    }

    return (
      <Card id="">
        <Segment style={{marginBottom: 0}} basic>
          <Image width='200' height='200' circular src={this.props.img} wrapped/>
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

export default CollabCard;