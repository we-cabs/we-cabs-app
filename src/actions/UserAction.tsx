import Axios from 'axios';
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from '../constants/UserConstants';
const api = Axios.create({
    baseURL: `https://a46jrcmngi.execute-api.us-west-2.amazonaws.com/dev`
})
export const signin = (loginData:any) => async (dispatch:any) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    api.get(`/user/${loginData.phoneNumber}`).then(user=>{
      let userData = user.data;
      if(user.data){
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: userData });
        localStorage.setItem('userInfo',JSON.stringify(userData));
        document.location.href = '/tabs';
      }else{
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload:'Invalid Login!',
        });
      }
    })
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch:any) => {
  document.location.href = '/login';
  localStorage.removeItem('userInfo');
  setTimeout(function(){
    dispatch({ type: USER_SIGNOUT });
  },1000)
};
