import Axios from 'axios';
import { BOOKING_DETAIL_FAIL, BOOKING_DETAIL_REQUEST, BOOKING_DETAIL_SUCCESS } from '../constants/BookingConstants';
const api = Axios.create({
  baseURL: `https://a46jrcmngi.execute-api.us-west-2.amazonaws.com/dev`
})
export const actionToGetBookingData = (payload:any) => async (dispatch:any) => {
  dispatch({ type: BOOKING_DETAIL_REQUEST });
  try {
    const response = await api.get('/booking');
    dispatch({ type: BOOKING_DETAIL_SUCCESS, payload: response.data.bookings });
  } catch (error) {
    dispatch({ type: BOOKING_DETAIL_FAIL, payload: error });
     console.log(error);
  }
};

export const addBookingData = (payload:any) => async (dispatch:any) => {
  try {
    const response = await api.post('/booking',payload);
    return response;
  } catch (error) {
     console.log(error);
  }
};
