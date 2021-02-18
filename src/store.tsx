import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { biddingDataReducer, bookingDetailsReducer } from './reducers/BookingReducers';
import { userSigninReducer } from './reducers/UserReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo') || `{}`)
          : null,
      },
      bookingDetails: {
        loading:false,
        error:false,
        booking:[
          {
            id:1,
            pickup_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
            base_price:2200,
          },
          {
            id:2,
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
            base_price:1200,
          },
          {
            id:3,
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
            base_price:2400,
          },
          {
            id:4,
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
            base_price:1300,
          },
          {
            id:5,
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
            base_price:2800,
          },
          {
            id:6,
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
            base_price:1100,
          },
          {
            id:7,
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
            base_price:3400,
          },
          {
            id:8,
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
            base_price:3200,
          },
          {
            id:9,
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
            base_price:2000,
          },
          {
            id:10,
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
            base_price:1000,
          },
        ]
      },
      biddingData:[],
};
export const rootReducer = combineReducers({
    userSignin: userSigninReducer,
    bookingDetails:bookingDetailsReducer,
    biddingData:biddingDataReducer,
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
