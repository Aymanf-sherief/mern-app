import React, { Component } from "react";
import {  Form } from 'react-bootstrap';

class Input extends Component {
  render() {
    return (
      <Form.Group controlId={this.props.name}>
        <Form.Label>{this.props.placeholder}</Form.Label>
        <Form.Control {...this.props} />
      </Form.Group>
    );
  }
}

export default Input;
