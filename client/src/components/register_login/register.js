import React, { Component } from "react";
import Input from "./input";
import Cookies from "js-cookie";

import { loginUser, registerUser } from "../../actions/user_actions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Register extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    lastname: "",
    errors: [],
    redirect: null,
  };

  handleChange = (event) => {
    console.log({ [event.target.name]: event.target.value });
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm(event) {
    console.log(event);
    event.preventDefault();
    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      lastname: this.state.lastname,
    };
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [] });
      console.log(dataToSubmit);
      this.props.dispatch(registerUser(dataToSubmit)).then((response) => {
        console.log(response);
        if (response.payload.registerSuccess) {
         this.setState({redirect: '/login'})
        }
      });
    }
  }

  isFormValid({ email, password, name, lastname }) {
    return email && password && name && lastname;
  }
  displayErrors() {
    return (
      <div className="row">
        {this.state.errors.map((e, i) => (
          <p key={i}>{e}</p>
        ))}
      </div>
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="container">
        <h2>Register</h2>
        <div className="row">
          <form
            className="col s12"
            onSubmit={(event) => this.submitForm(event)}
          >
            <Input
              type="text"
              inputName="name"
              value={this.state.name}
              handleChange={this.handleChange}
            ></Input>
            <Input
              type="text"
              inputName="lastname"
              value={this.state.lastname}
              handleChange={this.handleChange}
            ></Input>
            <Input
              type="email"
              inputName="email"
              value={this.state.email}
              handleChange={this.handleChange}
            ></Input>
            <Input
              type="password"
              inputName="password"
              value={this.state.password}
              handleChange={this.handleChange}
            ></Input>
            {this.displayErrors()}
            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect green lighten-2"
                  type="submit"
                  name="action"
                >
                  sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Register);
