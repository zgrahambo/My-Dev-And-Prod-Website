import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

class ErrorPage extends Component {
  render() {
    return (
      <Container>
        <Header as="h1"> { this.props.msg } </Header>
        <Header as="h2"> { this.props.errStatus } </Header>
        <pre> { this.props.errStack } </pre>
      </Container>
    );
  }
}

export default ErrorPage;
