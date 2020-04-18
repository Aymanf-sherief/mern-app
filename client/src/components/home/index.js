import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Home extends Component {
  render() {
    console.log(this.props.user);
    
      return (
        <div>
          <h2>Hello, {this.props.user.userData.name}</h2>
        </div>
      );
  
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
