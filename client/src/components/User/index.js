import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PostList from "../PostList";
import { Container } from "react-bootstrap";
import axios from 'axios'

axios.defaults.withCredentials = true;

class Home extends Component {
  state = {
    redirect: false,
    UserWithPosts: false,
  };

  loadPosts() {
    const username = this.props.match.params.username
    axios.get(`/api/posts/list/${username}`)
        .then((response) => {
          console.log(`getPosts resp: ${JSON.stringify(response)}`);

          this.setState({ UserWithPosts: response.data.UserWithPosts });
        })
        .catch((err) => console.log(`getPosts resp: ${JSON.stringify(err)}`));
    }
  

 
componentWillMount(){
  this.loadPosts();
}
  render() {
    
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Container fluid>
       <h5>{this.state.UserWithPosts.username}'s posts</h5>
        <PostList posts={this.state.UserWithPosts.posts}/>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
