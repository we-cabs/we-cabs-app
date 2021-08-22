import Axios from 'axios';
import { cloneDeep } from 'lodash';
import {
  ALL_USER_DATA_FAIL,
  ALL_USER_DATA_REQUEST,
  ALL_USER_DATA_SUCCESS,
  USER_CAR_FAIL,
  USER_CAR_REQUEST,
  USER_CAR_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from '../constants/UserConstants';
import { pushNotification } from './PushNotificationHelper';
const api = Axios.create({
    baseURL: `https://a46jrcmngi.execute-api.us-west-2.amazonaws.com/dev`
})
export const signin = (loginData:any) => async (dispatch:any) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    api.get(`/user/${loginData.phoneNumber}`).then(user=>{
      let userData = user.data;
      if(user.data){
        if(user.data.approvalStatus != 'approved'){
          dispatch({
            type: USER_SIGNIN_FAIL,
            payload:'User not approved!',
          });
        }else if(loginData.password != user.data.password){
          dispatch({
            type: USER_SIGNIN_FAIL,
            payload:'Wrong Password!',
          });
        }else{
          dispatch({ type: USER_SIGNIN_SUCCESS, payload: userData });
          localStorage.setItem('userInfo',JSON.stringify(userData));
          document.location.href = '/';
        }
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
export const actionToGetUserDataById = (id:any) => async (dispatch:any) => {
  try {
    api.get(`/user/${id}`).then(user=>{
      let userData = user.data;

      dispatch({ type: USER_SIGNIN_SUCCESS, payload: cloneDeep(userData) });
      localStorage.setItem('userInfo',JSON.stringify(userData));
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
}
export const actionToGetUserCar = (id:any,isLoading = 1) => async (dispatch:any) => {
  if(isLoading)
  dispatch({ type: USER_CAR_REQUEST });
  try {
    api.get(`/car/userId/${id}`).then(car=>{
      let carData = car.data.cars;
      if(car.data){
        dispatch({ type: USER_CAR_SUCCESS, payload: carData });
      }else{
        dispatch({
          type: USER_CAR_FAIL,
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
export const actionToGetAllUserData = () => async (dispatch:any) => {
  dispatch({ type: ALL_USER_DATA_REQUEST });
  try {
    api.get(`/user`).then(user=>{
      let userData = user.data.users;
      if(user.data){
        dispatch({ type: ALL_USER_DATA_SUCCESS, payload: userData });
      }else{
        dispatch({
          type: ALL_USER_DATA_FAIL,
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
  document.location.href = '/';
  localStorage.removeItem('userInfo');
  setTimeout(function(){
    dispatch({ type: USER_SIGNOUT });
  },1000)
};
export const actionToGetUserDeviceToken = () => async (dispatch:any,useState:any) => {
  pushNotification(dispatch,useState());
};