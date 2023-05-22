import { setError } from '../actions/errors';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants';

const initialState = {
  token: localStorage.getItem('token') || null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        loading: false,
        token: action.payload.token,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      setError(action.payload);
      return { ...state, loading: false };
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        isSuperUser: false,
      };
    default:
      return state;
  }
};

export default authReducer;
