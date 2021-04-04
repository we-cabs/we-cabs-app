import { BIDDING_DETAIL_BY_USER_ID_FAIL, BIDDING_DETAIL_BY_USER_ID_REQUEST, BIDDING_DETAIL_BY_USER_ID_SUCCESS, BIDING_DETAIL_SUCCESS } from '../constants/BiddingConstants';
export const biddingDataReducer = (state = {}, action:any) => {
    switch (action.type) {
      case BIDING_DETAIL_SUCCESS:
        return action.payload;
      default:
        return state;
    }
  };

  export const biddingDetailByUserIdReducer = (state = {}, action:any) => {
    switch (action.type) {
      case BIDDING_DETAIL_BY_USER_ID_REQUEST:
        return { loading: true };
      case BIDDING_DETAIL_BY_USER_ID_SUCCESS:
        return { loading: false, bidData: action.payload };
      case BIDDING_DETAIL_BY_USER_ID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };