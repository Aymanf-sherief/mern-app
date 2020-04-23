import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logoutUser } from "../../actions/user_actions";
import Cookies from "js-cookie";

class Home extends Component {
  state = {
    redirect: false,
  };
  render() {
    console.log(this.props.user);
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <h2>Hello, {this.props.user.userData.name}</h2>
        <button
          className="btn waves-effect red lighten-2"
          onClick={(e) => {
            this.props.dispatch(logoutUser()).then((resp) => {
              console.log(JSON.stringify(resp));
              if (resp.payload.logoutSuccess) {
                Cookies.remove("x_auth");
                this.setState({redirect: '/'})
              }
            });
          }}
        >
          log out
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
