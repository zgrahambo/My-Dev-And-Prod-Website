import React, { Component } from 'react';
import { Grid, Segment, Icon, } from 'semantic-ui-react';

class Infoblock extends Component {
  render() {
    return (
      <Grid.Column>
        <Segment>
          <a className="ui header" data-position="top center"
             data-variation="small" href={ this.props.href } 
             target={ this.props.target }>
            <Icon name={ this.props.iconClass }/> { this.props.infoText }
          </a>
        </Segment>
      </Grid.Column>
    );
  }
}

export default Infoblock;