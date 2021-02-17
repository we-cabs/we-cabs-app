import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { bookingDetailsReducer } from './reducers/BookingReducers';
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
            pickup_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
          },
          {
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
          },
          {
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
          },
          {
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
          },
          {
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
          },
          {
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
          },
          {
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
          },
          {
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
          },
          {
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
          },
          {
            pick_point:'Dehradoon',
            drop_point:'Delhi',
            pickup_time:'4:00 PM',
            pickup_date:'1st Feb 2021',
            cab_type:'Sadan',
            booking_date_time:'4:00 PM 2nd Dec',
          },
        ]
      },
};
export const rootReducer = combineReducers({
    userSignin: userSigninReducer,
    bookingDetails:bookingDetailsReducer,
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
