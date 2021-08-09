import Axios from 'axios';
import { cloneDeep } from 'lodash';
import { BIDDING_DETAIL_BY_USER_ID_FAIL, BIDDING_DETAIL_BY_USER_ID_REQUEST, BIDDING_DETAIL_BY_USER_ID_SUCCESS, BIDING_DETAIL_SUCCESS } from '../constants/BiddingConstants';
const api = Axios.create({
  baseURL: `https://a46jrcmngi.execute-api.us-west-2.amazonaws.com/dev`
})
export const addBiddingBookingData = (payload:any) => async (dispatch:any) => {
  dispatch({ type: BIDING_DETAIL_SUCCESS, payload: payload });
};
export const actionToUpdateUserNotificationData = (payload:any) => async (dispatch:any,getState:any) => {
  
  let notifications = payload.data;
  if(Object.keys(notifications) != undefined && notifications[payload.key] != undefined){
    delete notifications[payload.key];
  }

  let userInfo = getState().userSignin.userInfo;

  let insertData = {
    "userId": userInfo.phone,
    "phone": userInfo.phone,
    "profileImgUrl": userInfo.userImagesUrl,
    "approvalStatus": userInfo.approvalStatus,
    "email": userInfo.email,
    "name": userInfo.name,
    "location":userInfo.location,
    "password":userInfo.password,
    "notifications":notifications,
    "balance":userInfo.balance,
    "role":userInfo.role,
    "images":userInfo.images,
    "deviceToken":userInfo.deviceToken,
  }
  try {
    api.post('/user',insertData);
  } catch (error) {
    console.log(error);
  }
};



export const actionToAddBiddingData = (payload:any) => async (dispatch:any,getState:any) => {
  try {
    const response = await api.post('/bid',payload);
    dispatch(actionToGetBidByUserId(getState().userSignin.userInfo.phone));
    return response;
  } catch (error) {
     console.log(error);
  }
};
export const actionToGetBidByUserId = (id:any,isLoading = 1) => async (dispatch:any,getState:any) => {
  if(isLoading)
  dispatch({ type: BIDDING_DETAIL_BY_USER_ID_REQUEST });

  try {
    const response = await api.get(`/bid/userId/${id}`);
    let bidData = response.data.bids;

    let newaddedBidData:any = [];
    var bookingNewData:any = {};
    if(bidData.length){
       bidData.map((bid:any) => {
         let bookingData = getState().bookingDetails.booking;
         if(bookingData != undefined && bookingData.length){
          bookingData.map((booking:any)=>{
            if(booking.bookingId == bid.linkedBookingId){
              bookingNewData = booking;
              bookingNewData.bidStatus = bid.status;
              bookingNewData.carPlate = bid.carPlate;
              bookingNewData.amount = bid.amount;
              newaddedBidData.push(bookingNewData);
            }
          })
         }
    
      })
    }
    dispatch({ type: BIDDING_DETAIL_BY_USER_ID_SUCCESS, payload: cloneDeep(newaddedBidData)});
  } catch (error) {
    dispatch({ type: BIDDING_DETAIL_BY_USER_ID_FAIL, payload: error });
     console.log(error);
  }
};