import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { logoutUser } from "../../actions/user_actions";
import Cookies from "js-cookie";

import { connect } from "react-redux";

class CustomNavbar extends Component {
  Logout = (e) => {
    this.props.dispatch(logoutUser()).then((resp) => {
      console.log(JSON.stringify(resp));
      if (resp.payload.logoutSuccess) {
        Cookies.remove("x_auth");
        this.setState({ redirect: "/" });
      }
    });
  };

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="home">
          Hello,
          {this.props.user.userData ? this.props.user.userData.name : "Guest"}
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="home">Home</Nav.Link>
            {this.props.user.userData ? (
              <Nav.Link href="logout" onClick={this.Logout}>
                logout
              </Nav.Link>
            ) : (
              <Nav className="mr-auto">
              <Nav.Link href="login">login</Nav.Link>
              <Nav.Link href="register">register</Nav.Link>

              </Nav>  
            )}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(CustomNavbar);
