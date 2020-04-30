import React, { Component } from "react";
import { Card } from "react-bootstrap";
class Post extends Component {
  render() {
    const cardStyle = {
      marginBottom: '5px',
      
    };
    return (
      <Card style={cardStyle}>
        <Card.Body>
          <Card.Title>{this.props.user}</Card.Title>
          <Card.Text>{this.props.body}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Post;
