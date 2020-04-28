import React, { Component } from "react";
import { Card } from "react-bootstrap";
class Post extends Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{this.props.user}</Card.Title>
          <Card.Text>{this.props.body}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Post;
