import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class AboutMeFrame extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          { this.props.children }
        </Grid.Row>
      </Grid>
    );
  }
}

export default AboutMeFrame;