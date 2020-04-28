import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PostList from "../PostList";
import { Container } from "react-bootstrap";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post/actions";

class Home extends Component {
  state = {
    redirect: false,
    posts: false,
  };

  loadPosts() {
    if (this.props.user.authSuccess) {
      this.props
        .dispatch(getPosts())
        .then((response) => {
          console.log(`getPosts resp: ${JSON.stringify(response)}`);

          this.setState({ posts: response.payload.posts });
        })
        .catch((err) => console.log(`getPosts resp: ${JSON.stringify(err)}`));
    }
  }

  pushPost = (post) => {
    const newPosts = [post, ...this.state.posts];
    this.setState({ posts: newPosts });
  }
componentWillMount(){
  this.loadPosts();
}
  render() {
    console.log(this.props.user);
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Container fluid>
        <PostForm
          pushPost={this.pushPost}
          user={this.props.user.userData}
        ></PostForm>
        <PostList posts={this.state.posts}/>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
