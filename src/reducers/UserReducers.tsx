import {
  ALL_USER_DATA_FAIL,
  ALL_USER_DATA_REQUEST,
  ALL_USER_DATA_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
  } from '../constants/UserConstants';
  
  export const userSigninReducer = (state = {}, action:any) => {
    switch (action.type) {
      case USER_SIGNIN_REQUEST:
        return { loading: true };
      case USER_SIGNIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_SIGNIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_SIGNOUT:
        return { loading: false, userInfo: {}};
      default:
        return state;
    }
  };
  export const allUserDataReducer = (state = {}, action:any) => {
    switch (action.type) {
      case ALL_USER_DATA_REQUEST:
        return { loading: true };
      case ALL_USER_DATA_SUCCESS:
        return { loading: false, userData: action.payload };
      case ALL_USER_DATA_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  