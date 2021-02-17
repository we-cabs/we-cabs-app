import { BOOKING_DETAIL_FAIL, BOOKING_DETAIL_REQUEST, BOOKING_DETAIL_SUCCESS } from '../constants/BookingConstants';
  
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
  