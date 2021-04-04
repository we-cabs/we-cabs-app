import Axios from 'axios';
import { BIDDING_DETAIL_BY_BOOKING_ID_FAIL, BIDDING_DETAIL_BY_BOOKING_ID_REQUEST, BIDDING_DETAIL_BY_BOOKING_ID_SUCCESS } from '../constants/BiddingConstants';
import { BOOKING_DATA_FILTER, BOOKING_DETAIL_FAIL, BOOKING_DETAIL_REQUEST, BOOKING_DETAIL_SUCCESS } from '../constants/BookingConstants';
import { pushNotification } from './PushNotificationHelper';
const api = Axios.create({
  baseURL: `https://a46jrcmngi.execute-api.us-west-2.amazonaws.com/dev`
})


export const actionToGetBookingData = (isLoad = 1) => async (dispatch:any) => {
  if(isLoad)
    dispatch({ type: BOOKING_DETAIL_REQUEST });
  try {
    const response = await api.get('/booking');
    dispatch({ type: BOOKING_DETAIL_SUCCESS, payload: response.data.bookings });
    dispatch(actionToSetAllBookingFilters(response.data.bookings));

  } catch (error) {
    dispatch({ type: BOOKING_DETAIL_FAIL, payload: error });
     console.log(error);
  }
};
export const actionToSetAllBookingFilters = (bookingData:any) => async (dispatch:any) => {
   let pickupCity:string[] = [];
   let dropCity:string[] = [];
   let cabType:string[] = [];

   if(bookingData && bookingData.length){
    bookingData.map((booking:any)=>{
      if(!pickupCity.includes(booking.pickupPoint)){
        pickupCity.push(booking.pickupPoint);
      }
      if(!dropCity.includes(booking.dropPoint)){
        dropCity.push(booking.dropPoint);
      }
      if(!cabType.includes(booking.carType)){
        cabType.push(booking.carType);
      }
    })
   }

  dispatch({ type: BOOKING_DATA_FILTER, payload: {pickupCity,dropCity,cabType} });
}
export const addBookingData = (payload:any) => async (dispatch:any) => {
  try {
    const response = await api.post('/booking',payload);
    return response;
  } catch (error) {
     console.log(error);
  }
};
export const actionToSendPushNotification = (payload:any) => async (dispatch:any) => {
  pushNotification(payload);
};
export const actionToUpdateBooking = (payload:any) => async (dispatch:any) => {
  api.post('/booking',payload).then((res)=>{
    dispatch(actionToGetBookingData(0));
  })
};

export const actionToGetBidingDataByBooking = (bookingData:any) => async (dispatch:any) => {
    dispatch({ type: BIDDING_DETAIL_BY_BOOKING_ID_REQUEST });
  try {
    const response = await api.get(`/bid/bookingId/${bookingData.bookingId}`);
    dispatch({ type: BIDDING_DETAIL_BY_BOOKING_ID_SUCCESS, payload: response.data.bids });
  } catch (error) {
     dispatch({ type: BIDDING_DETAIL_BY_BOOKING_ID_FAIL, payload: error });
     console.log(error);
  }
};
