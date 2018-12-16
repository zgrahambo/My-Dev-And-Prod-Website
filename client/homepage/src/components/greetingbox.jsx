import React, { Component } from 'react';
import { Grid, Header, Divider, Segment } from 'semantic-ui-react';

class GreetingBox extends Component {
  render() {
    return (
      <Grid.Column mobile={16} tablet={12} computer={13}>
        <Header textAlign="center" as='h1'>{ this.props.name }</Header>
        <Divider horizontal ><Header as="h5">About Me</Header></Divider>
        <Segment basic>
          <p>Hello and welcome to my home page! My name is Zach and I am a frontend
            software engineer at eBay. I majored in Computer Science with an emphasis in cybersecurity at Santa Clara
            University. I enjoy movies, gaming, fitness, and coding. Feel free to click the links below to learn more
            about me!</p>
        </Segment>
      </Grid.Column>
    );
  }
}

export default GreetingBox;
