import React, { Component } from "react";
import Input from "./input";

import { Redirect } from "react-router-dom";
import {  Form, Button } from 'react-bootstrap';

class RegisterFrom extends Component {
  render() {
  
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Input placeholder="Email Address" type="email" name="email" onChange={this.props.handleChange}></Input>
        <Input placeholder="Username" type="text" name="username" onChange={this.props.handleChange}></Input>
        
        <Input placeholder="Password" type="password" name="password" onChange={this.props.handleChange}></Input>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    );
  }
}


export default RegisterFrom;
