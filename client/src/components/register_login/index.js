import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";
import { Redirect } from "react-router-dom";
import Cookies from 'js-cookie';

import Input from "./input";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    redirect: null,
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.type]: event.target.value });
  }

  submitForm(event) {
    event.preventDefault();
    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(`data: ${JSON.stringify(dataToSubmit)}`);
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [] });
      console.log(dataToSubmit);
      this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
        console.log("going home");

        console.log(response);
        this.setState({ redirect: "/Home" });
      });
    }
  }

  isFormValid({ email, password }) {
    return email && password;
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
        <h2>Login</h2>
        <div className="row">
          <form
            className="col s12"
            onSubmit={(event) => this.submitForm(event)}
          >
            <Input
              type="email"
              value={this.state.email}
              handleChange={this.handleChange}
            ></Input>
            <Input
              type="password"
              value={this.state.password}
              handleChange={(event) => this.handleChange(event)}
            ></Input>
            {this.displayErrors()}
            {JSON.stringify(Cookies.get())}
            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                >
                  Log in
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

export default connect(mapStateToProps)(Login);
