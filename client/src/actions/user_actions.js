import axios from "axios";
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, AUTH_USER } from "./types";

axios.defaults.withCredentials = true;


export function loginUser(loginData) {
  const resp = axios
    .post("/api/users/login", loginData)
    .then((response) => response.data);
  console.log(resp);
  return {
    type: LOGIN_USER,
    payload: resp,
  };
}

export function authUser() {
  const resp = axios.get("/api/users/auth", {withCredentials: true}).then((response) => {
    console.log(response.data);

    return response.data;
  });
  
  return {
    type: AUTH_USER,
    payload: resp,
  };
}
