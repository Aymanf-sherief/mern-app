import axios from "axios";
import { CREATE_POST, GET_POST } from "./types";

axios.defaults.withCredentials = true;


export function createPost(postData) {
  const resp = axios
    .post("/api/posts/create", postData)
    .then((response) => response.data);
  console.log(resp);
  return {
    type: CREATE_POST,
    payload: resp,
  };
}

export function getPosts() {
    const resp = axios
      .get("/api/posts/list")
      .then((response) => response.data);
    console.log(resp);
    return {
      type: GET_POST,
      payload: resp,
    };
  }
  