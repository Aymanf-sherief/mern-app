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
    posts: false,
  };

  loadPosts() {
    const username = this.props.match.params.username
    axios.get(`/api/posts/list/${username}`)
        .then((response) => {
          console.log(`getPosts resp: ${JSON.stringify(response)}`);

          this.setState({ posts: response.data.posts });
        })
        .catch((err) => console.log(`error resp: ${JSON.stringify(err)}`));
    }
  

 
componentDidMount(){
  this.loadPosts();
}
  render() {
    
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    console.log(`Posts are: ${this.state.posts}`)
    if(this.state.posts){
    return (
      <Container fluid>
       <h5>{this.state.posts[0].user.username}'s posts</h5>
        <PostList posts={this.state.posts}/>
      </Container>
    );}
    else{
      return <h5>Loading Posts ...</h5>
    }
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
