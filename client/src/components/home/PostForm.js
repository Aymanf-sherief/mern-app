import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { createPost } from "../../actions/post/actions";
import { connect } from "react-redux";

class PostForm extends Component {
  state = {
    body: "",
  };

  handleChange = (event) => {
    console.log({ [event.target.name]: event.target.value });
    this.setState({ [event.target.name]: event.target.value });
  }
  submitPost = (event) => {
    event.preventDefault();
    const dataToSubmit = {
      body: this.state.body,
      datetime: new Date().toUTCString(),
    };
    this.props.dispatch(createPost(dataToSubmit)).then((response) => {
      console.log(`getPosts resp: ${JSON.stringify(response)}`);

      this.props.pushPost(response.payload.postData);
    });
  }

  render() {
    const cardStyle = {
      margin: '15px',
      
    };
    return (
      <Form style = {cardStyle}>
        <Form.Row>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <Button onClick={this.submitPost}>Post</Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}


function mapStateToProps(state) {
  return { postStore: state.post };
}

export default connect(mapStateToProps)(PostForm);


