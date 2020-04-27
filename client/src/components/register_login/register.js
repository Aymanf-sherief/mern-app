import React, { Component } from "react";
import Input from "./input";

import { Redirect } from "react-router-dom";
import {  Form, Button } from 'react-bootstrap';

class RegisterFrom extends Component {
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Form>
        <Input placeholder="Email Address" type="email" name="email"></Input>
        <Input placeholder="First Name" type="text" name="name"></Input>
        <Input placeholder="Last Name" type="text" name="lastname"></Input>
        <Input placeholder="Password" type="password" name="password"></Input>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    );
  }
}


export default RegisterFrom;
