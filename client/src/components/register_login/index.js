import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, registerUser } from "../../actions/user_actions";
import { Redirect } from "react-router-dom";

import LoginForm from "./login";
import RegisterForm from "./register"

class LoginRegister extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    lastname: "",
    errors: [],
    redirect: null,
    newUser: false,
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setState({newUser: this.props.newUser})
    
  }

  handleChange(event) {
    console.log({ [event.target.type]: event.target.value })
    this.setState({ [event.target.type]: event.target.value });
  }

  OnSubmitSignup(event) {
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
    
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    if(this.state.newUser)
    return <RegisterForm onSubmit={this.OnSubmitSignup}></RegisterForm>;
    else
    return <LoginForm onSubmit={this.OnSubmitLogin} handleChange={this.handleChange}></LoginForm>;

  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(LoginRegister);
