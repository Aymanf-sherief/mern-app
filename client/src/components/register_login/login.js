import React, { Component } from "react";
import Input from "./input";
import {  Form, Button } from 'react-bootstrap';

class LoginForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Input placeholder="Email Address" type="email" name="email"  onChange={this.props.handleChange}></Input>

        <Input placeholder="Password" type="password" name="password" onChange={this.props.handleChange}></Input>
        <Button variant="primary" type="submit">
    Log In
  </Button>

      </Form>
    );
  }
}

export default LoginForm;
