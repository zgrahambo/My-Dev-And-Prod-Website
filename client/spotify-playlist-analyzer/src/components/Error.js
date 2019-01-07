import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

class Error extends Component {

  render() {
    return (
      <Grid centered columns={2}>
        <Segment inverted color='red' secondary>
            {this.props.msg}
        </Segment>
      </Grid>
    );
  }
}


export default Error;