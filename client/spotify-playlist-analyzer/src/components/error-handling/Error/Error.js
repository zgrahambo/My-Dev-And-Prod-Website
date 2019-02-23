import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import errStyle from './Error.module.scss';

const windowLoc = window.location;
const spaUrl = windowLoc.protocol + '//' + 
               windowLoc.host +
               windowLoc.pathname;

class Error extends Component {

  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
        <Segment inverted color='red' secondary>
          {this.props.msg}
          <p><a className={errStyle['error-link']} href={this.props.link ? this.props.link : spaUrl}>{this.props.linkText}</a></p>
        </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Error;