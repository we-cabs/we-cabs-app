import Axios from 'axios';
import { BIDING_DETAIL_SUCCESS } from '../constants/BookingConstants';
const api = Axios.create({
  baseURL: `https://a46jrcmngi.execute-api.us-west-2.amazonaws.com/dev`
})
export const addBiddingBookingData = (payload:any) => async (dispatch:any) => {
  dispatch({ type: BIDING_DETAIL_SUCCESS, payload: payload });
};
export const addBookingData = (payload:any) => async (dispatch:any) => {
  try {
    const response = await api.post('/booking',payload);
    return response;
  } catch (error) {
     console.log(error);
  }
};
