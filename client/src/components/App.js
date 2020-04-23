import React, { useState, useEffect, Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import About from "./about";
import Home from "./home";

import Login from "./register_login";
import Register from "./register_login/register";
import { AuthenticatedRoute, UnAuthenticatedRoute } from "./route";
import { authUser } from "../actions/user_actions";

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
          console.log(
            `isAuthed is: ${JSON.stringify(response.payload.authSuccess)}`
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
      <div className="App container">
        <h1> Welcome to my app </h1>{" "}
        <Switch>
          <UnAuthenticatedRoute
            path="/login"
            component={Login}
            appProps={{ isAuthenticated: this.state.isAuthenticated, auth: () => {this.Auth()} }}
          />
          <UnAuthenticatedRoute
            path="/register"
            component={Register}
            appProps={{ isAuthenticated: this.state.isAuthenticated, auth: () => {this.Auth()}  }}
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
