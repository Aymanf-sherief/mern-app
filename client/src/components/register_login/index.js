import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, registerUser } from "../../actions/user/actions";
import { Redirect } from "react-router-dom";

import LoginForm from "./login";
import RegisterForm from "./register";

class LoginRegister extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    errors: [],
    redirect: null,
    newUser: false,
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log({ [event.target.name]: event.target.value });
    this.setState({ [event.target.name]: event.target.value });
  }

  OnSubmitSignup = (event) => {
    console.log("sign up");
    event.preventDefault();
    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
    };
    this.setState({ errors: [] });
    console.log(dataToSubmit);
    this.props.dispatch(registerUser(dataToSubmit)).then((response) => {
      console.log(response);
      if (response.payload.registerSuccess) {
        this.setState({ redirect: "/login" });
      }
    });
  }

  OnSubmitLogin = (event) => {
    event.preventDefault();
    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(`data: ${JSON.stringify(dataToSubmit)}`);

    this.setState({ errors: [] });
    console.log(dataToSubmit);
    this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
      console.log("going home");

      console.log(response);
      if (response.payload.loginSuccess) {
        this.props.auth();
      }
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if (this.props.newUser) {
      return (
        <RegisterForm
          onSubmit={this.OnSubmitSignup}
          handleChange={this.handleChange}
        >
          >
        </RegisterForm>
      );
    } else {
      return (
        <LoginForm
          onSubmit={this.OnSubmitLogin}
          handleChange={this.handleChange}
        ></LoginForm>
      );
    }
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(LoginRegister);
