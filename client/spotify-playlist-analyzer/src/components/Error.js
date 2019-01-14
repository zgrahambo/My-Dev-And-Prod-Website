import React, { Component } from 'react';
import { Grid, Segment, Label } from 'semantic-ui-react';

class Error extends Component {

  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
        <Segment inverted color='red' secondary>
            {this.props.msg}
            <p><a href={this.props.link} style={{color: "#030069", textDecoration: "underline"}}>{this.props.linkText}</a></p>
        </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Error;