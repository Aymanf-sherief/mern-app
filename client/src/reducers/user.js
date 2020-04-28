import { LOGIN_USER, AUTH_USER } from "../actions/user/types";

export default function (state = {}, action = {}) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      };
      case AUTH_USER:
        return {
          ...state,
          ...action.payload,
        };
    default:
      return  {
        ...state,
        ...action.payload,
      };;
  }
}
