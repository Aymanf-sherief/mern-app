import React, { Component } from "react";
import Post from "./post";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post/actions";
import { ListGroup } from "react-bootstrap";
import PostForm from "../home/PostForm";

class PostList extends Component {
  state = {
    posts: false,
  };

  

  render() {
    if (!this.props.posts) return <h4>Loading posts....</h4>;
    else {
      console.log(`posts: ${JSON.stringify(this.props.posts)}`)
      return (

        <ListGroup>
         
          {this.props.posts.map((value, index) => {
            return (
              <Post
                user={`${value.user.name} ${value.user.lastname}`}
                body={value.body}
              />
            );
          })}
        </ListGroup>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    postStore: state.post,
    
  };
}

export default connect(mapStateToProps)(PostList);
