import Axios from 'axios';
import { BIDING_DETAIL_SUCCESS } from '../constants/BiddingConstants';
const api = Axios.create({
  baseURL: `https://a46jrcmngi.execute-api.us-west-2.amazonaws.com/dev`
})
export const addBiddingBookingData = (payload:any) => async (dispatch:any) => {
  dispatch({ type: BIDING_DETAIL_SUCCESS, payload: payload });
};
export const actionToAddBiddingData = (payload:any) => async (dispatch:any) => {
  try {
    const response = await api.post('/bid',payload);
    return response;
  } catch (error) {
     console.log(error);
  }
};