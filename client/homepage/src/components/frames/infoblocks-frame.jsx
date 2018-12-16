import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class InfoblocksFrame extends Component {
  render() {
    return (
      <Grid doubling stackable textAlign="center" columns={3}>
        { this.props.children }
      </Grid>
    );
  }
}

export default InfoblocksFrame;