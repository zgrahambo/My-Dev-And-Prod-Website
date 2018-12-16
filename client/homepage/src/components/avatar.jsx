import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';

class Avatar extends Component {
  render() {
    return (
      <Grid.Column only="tablet computer" tablet={4} computer={3}>
        <Image avatar size="small" src={ this.props.src } />
      </Grid.Column>
    );
  }
}

export default Avatar;