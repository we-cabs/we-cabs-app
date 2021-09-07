import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { biddingDataReducer,biddingDetailByUserIdReducer,biddingDetailByBookingIdReducer } from './reducers/BiddingReducer';
import { bookingDetailsReducer,bookingDataFilterReducer,cabTypeReducer,updateCarDataReducer, editBookingDataReducer } from './reducers/BookingReducers';
import { allUserDataReducer, userSigninReducer,carDataReducer } from './reducers/UserReducers';
import { selectedUserCarDataReducer, selectedUserDataReducer,editUserDataReducer, allBookingRequestDataReducer } from './reducers/AdminReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo') || `{}`)
          : null,
      },
      allUserData:{},
      bookingFilterValues:{pickupCity:[],dropCity:[],cabType:[]}, 
      cabType:[
        "Sedan with carrier",
        "Sedan",
        "Ertiga",
        "Innova",
        "Innova Crysta",
        "TempoTraveller12+1",
        "TempoTraveller13+1",
        "TempoTraveller14+1",
        "TempoTraveller16+1",
        "TempoTraveller17+1",
        "TempoTraveller26+1"
      ],
      bookingDetails: {
        loading:false,
        error:false,
        booking:[]
      },
      biddingData:[],
      carData:[],
      selectedUserCarData:{},
      selectedUserDataid:'',
      biddingDetailByUserId:{bidData:[]},
      biddingDetailByBookingId:{},
      updateCarData:{},
      editUserData:{},
      allBookingRequestData:{},
      editBookingData:{},
      
};
export const rootReducer = combineReducers({
    userSignin: userSigninReducer,
    bookingDetails:bookingDetailsReducer,
    cabType:cabTypeReducer,
    biddingData:biddingDataReducer,
    allUserData:allUserDataReducer,
    bookingFilterValues:bookingDataFilterReducer,
    carData:carDataReducer,
    selectedUserCarData:selectedUserCarDataReducer,
    selectedUserDataid:selectedUserDataReducer,
    biddingDetailByUserId:biddingDetailByUserIdReducer,
    biddingDetailByBookingId:biddingDetailByBookingIdReducer,
    updateCarData:updateCarDataReducer,
    editUserData:editUserDataReducer,
    allBookingRequestData:allBookingRequestDataReducer,
    editBookingData:editBookingDataReducer,
});
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancer =  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof rootReducer>
export default store;
