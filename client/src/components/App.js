import React, { useState, useEffect, Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import About from "./about";
import Home from "./home";

import CustomNavbar from "./navbar"
import LoginRegister from "./register_login";
import RegisterFrom from "./register_login/register";
import { AuthenticatedRoute, UnAuthenticatedRoute } from "./route";
import { authUser } from "../actions/user/actions";
import { Container } from "react-bootstrap";
import User from "./User";

class App extends Component {
  state = {
    isAuthenticated: "not yet",
  };
  constructor(props) {
    super(props);
  }

  Auth() {
    console.log("loading");
    
      console.log(this.props);
      this.props
        .dispatch(authUser())
        .then((response) => {
          console.log(
            `auth resp: ${JSON.stringify(response)}`
          );
         

          this.setState({ isAuthenticated: response.payload.authSuccess});
        })
        .catch((e) => {
          console.log(`auth error: ${JSON.stringify(e)}`);
          this.setState({ isAuthenticated: false });
        });
    
   
  }

  componentWillMount() {
    this.Auth();
  }
  render() {
    if (this.state.isAuthenticated == "not yet") {
      return <h4>loading ... </h4>;
    }
    return (
      <Container>
        <CustomNavbar/>
        <Switch>
          <UnAuthenticatedRoute
            path="/login"
            component={LoginRegister}
            appProps={{ isAuthenticated: this.state.isAuthenticated, auth: () => {this.Auth()} }}
          />
          <UnAuthenticatedRoute
            path="/register"
            component={LoginRegister}
            appProps={{ isAuthenticated: this.state.isAuthenticated, auth: () => {this.Auth()}  ,newUser:true}}
          />{" "}
           <UnAuthenticatedRoute
            path="/@:username"
            component={User}
            appProps={{ isAuthenticated: this.state.isAuthenticated,}}
          />{" "}
          <AuthenticatedRoute
            path="/home"
            component={Home}
            appProps={{ isAuthenticated: this.state.isAuthenticated }}
          />{" "}
          <AuthenticatedRoute
            path="/about"
            component={About}
            appProps={{ isAuthenticated: this.state.isAuthenticated }}
          />{" "}
        </Switch>{" "}
        </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
