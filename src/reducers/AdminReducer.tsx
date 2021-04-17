import { ALL_BOOKING_REQUEST_DATA_FAIL, ALL_BOOKING_REQUEST_DATA_REQUEST, ALL_BOOKING_REQUEST_DATA_SUCCESS, EDIT_USER_DATA, SELECTED_USER_CAR_FAIL, SELECTED_USER_CAR_REQUEST, SELECTED_USER_CAR_SUCCESS, SELECTED_USER_DATA } from '../constants/AdminConstants';

export const selectedUserCarDataReducer = (state = {}, action:any) => {
  switch (action.type) {
      case SELECTED_USER_CAR_REQUEST:
        return { loading: true };
      case SELECTED_USER_CAR_SUCCESS:
        return { loading: false, carData: action.payload };
      case SELECTED_USER_CAR_FAIL:
        return { loading: false, error: action.payload,carData:[] };
      default:
        return state;
    }
};

export const allBookingRequestDataReducer = (state = {}, action:any) => {
  switch (action.type) {
      case ALL_BOOKING_REQUEST_DATA_REQUEST:
        return { loading: true };
      case ALL_BOOKING_REQUEST_DATA_SUCCESS:
        return { loading: false, bookingRequestData: action.payload };
      case ALL_BOOKING_REQUEST_DATA_FAIL:
        return { loading: false, error: action.payload,carData:[] };
      default:
        return state;
    }
};
  export const selectedUserDataReducer = (state = {}, action:any) => {
    switch (action.type) {
      case SELECTED_USER_DATA:
        return action.payload;
      default:
        return state;
    }
  };

  export const editUserDataReducer = (state = {}, action:any) => {
    switch (action.type) {
      case EDIT_USER_DATA:
        return action.payload;
      default:
        return state;
    }
  };