import { BIDING_DETAIL_SUCCESS } from '../constants/BiddingConstants';
export const biddingDataReducer = (state = {}, action:any) => {
    switch (action.type) {
      case BIDING_DETAIL_SUCCESS:
        return action.payload;
      default:
        return state;
    }
  };