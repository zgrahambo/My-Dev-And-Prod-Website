import React, { Component } from 'react';
import Error from './Error/Error';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true});
  }

  render() {
    if(this.state.hasError) {
      return (
        <Error msg="Something went wrong!" linkText="Try again!" />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;