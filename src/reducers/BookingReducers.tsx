import { BOOKING_DETAIL_FOR_EDIT } from '../constants/BiddingConstants';
import {BOOKING_DETAIL_FAIL, BOOKING_DETAIL_REQUEST, BOOKING_DETAIL_SUCCESS,BOOKING_DATA_FILTER,UPDATE_CAR_DATA} from '../constants/BookingConstants';
  
export const bookingDetailsReducer = (state = {}, action:any) => {
  switch (action.type) {
    case BOOKING_DETAIL_REQUEST:
      return { loading: true };
    case BOOKING_DETAIL_SUCCESS:
      return { loading: false, booking: action.payload };
    case BOOKING_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const bookingDataFilterReducer = (state = {}, action:any) => {
  switch (action.type) {
    case BOOKING_DATA_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export const editBookingDataReducer = (state = {}, action:any) => {
  switch (action.type) {
    case BOOKING_DETAIL_FOR_EDIT:
      return action.payload;
    default:
      return state;
  }
};

export const updateCarDataReducer = (state = {}, action:any) => {
  switch (action.type) {
    case UPDATE_CAR_DATA:
      return action.payload;
    default:
      return state;
  }
};


export const cabTypeReducer = (state = {}, action:any) => {
  switch (action.type) {
    default:
      return state;
  }
};
