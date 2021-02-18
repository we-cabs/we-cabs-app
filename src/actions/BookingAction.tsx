import Axios from 'axios';
import { BIDING_DETAIL_SUCCESS } from '../constants/BookingConstants';
const api = Axios.create({
    baseURL: `https://reqres.in/api`
})
export const addBiddingBookingData = (payload:any) => async (dispatch:any) => {
  try {
    dispatch({ type: BIDING_DETAIL_SUCCESS, payload: payload });
  } catch (error) {
  }
};
