import Axios from 'axios';
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from '../constants/UserConstants';
const api = Axios.create({
    baseURL: `https://reqres.in/api`
})
export const signin = (loginData:any) => async (dispatch:any) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    api.post('/register', loginData).then(res=>{
        api.get('/users/'+res.data.id).then(user=>{
            let userData = user.data.data;
            userData.role = 'admin';
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: userData });
            localStorage.setItem('userInfo',JSON.stringify(userData));
            document.location.href = '/tabs';
        })
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
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_SIGNOUT });
  document.location.href = '/login';
};
