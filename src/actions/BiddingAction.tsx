import Axios from 'axios';
import { BIDDING_DETAIL_BY_USER_ID_FAIL, BIDDING_DETAIL_BY_USER_ID_REQUEST, BIDDING_DETAIL_BY_USER_ID_SUCCESS, BIDING_DETAIL_SUCCESS } from '../constants/BiddingConstants';
const api = Axios.create({
  baseURL: `https://a46jrcmngi.execute-api.us-west-2.amazonaws.com/dev`
})
export const addBiddingBookingData = (payload:any) => async (dispatch:any) => {
  dispatch({ type: BIDING_DETAIL_SUCCESS, payload: payload });
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
export const actionToGetBidByUserId = (id:any) => async (dispatch:any) => {
  dispatch({ type: BIDDING_DETAIL_BY_USER_ID_REQUEST });
  try {
    const response = await api.get(`/bid/userId/${id}`);
    let bidData = response.data.bids;
    let newaddedBidData:any = [];
    let bookingData:any = {};
    if(bidData.length){
      bidData.map((bid:any)=>{
        api.get(`/booking/${bid.linkedBookingId}`).then(res=>{
          bookingData = res.data;
          bookingData.bidStatus = bid.status;
          bookingData.carPlate = bid.carPlate;
          newaddedBidData.push(bookingData);
        })
      })
      dispatch({ type: BIDDING_DETAIL_BY_USER_ID_SUCCESS, payload: newaddedBidData });
    }
  } catch (error) {
    dispatch({ type: BIDDING_DETAIL_BY_USER_ID_FAIL, payload: error });
     console.log(error);
  }
};