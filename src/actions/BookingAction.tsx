import Axios from 'axios';
import { cloneDeep, identity } from 'lodash';
import { BIDDING_DETAIL_BY_BOOKING_ID_FAIL, BIDDING_DETAIL_BY_BOOKING_ID_REQUEST, BIDDING_DETAIL_BY_BOOKING_ID_SUCCESS, BIDDING_DETAIL_BY_USER_ID_SUCCESS, BOOKING_DETAIL_FOR_EDIT } from '../constants/BiddingConstants';
import { BOOKING_DATA_FILTER, BOOKING_DETAIL_FAIL, BOOKING_DETAIL_REQUEST, BOOKING_DETAIL_SUCCESS, UPDATE_CAR_DATA } from '../constants/BookingConstants';
const api = Axios.create({
  baseURL: `https://a46jrcmngi.execute-api.us-west-2.amazonaws.com/dev`
})


export const actionToGetBookingData = (isLoad = 1) => async (dispatch:any) => {
  if(isLoad)
    dispatch({ type: BOOKING_DETAIL_REQUEST });
  try {
    const response = await api.get('/booking');
    let boookingDetails = response.data.bookings;
    boookingDetails.sort(function(a:any,b:any){
      return b.submittedAt - a.submittedAt;
    });
    dispatch({ type: BOOKING_DETAIL_SUCCESS, payload: boookingDetails });
    dispatch(actionToSetAllBookingFilters(boookingDetails));

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
    payload.notificationType = 'booking';
    let newNotification = {
      location:payload.pickupPoint,
      details:payload,
    }
    await api.post('/user/notification/location',newNotification);
    let notification = {
      "message": {
          "notification": {
              "title": "Added New Booking From "+payload.pickupPoint,
              "body": "Booking from "+payload.pickupPoint,
              "sound": 'notification.wav',
              "android_channel_id":"fcm_default_channel",
              "channel_id":"fcm_default_channel",
              "icon":"ic_launcher_round",
          },
          "data": {"page":"booking_page"}
      }
  }
    api.post('/user/addNotificationPush?rand='+Math.random(),notification);
    dispatch(actionToGetBookingData(0));
    return response;
  } catch (error) {
     console.log(error);
  }
};
export const editStartStopTripLocally = (payload:any) => async (dispatch:any,getState:any) => {
  let bookingData = cloneDeep(getState().biddingDetailByUserId.bidData);
  if(bookingData != undefined && bookingData.length){
    bookingData.map((bidData:any,index:any)=>{
      if(bidData.bookingId == payload.bookingId){
        bookingData[index] = payload;
      }
    })
  }
  dispatch({ type: BIDDING_DETAIL_BY_USER_ID_SUCCESS, payload: cloneDeep(bookingData)});
};

export const addDetailToGetBookingData = (payload:any) => async (dispatch:any) => {
  try {
    const response = await api.post('/request',payload);
    return response;
  } catch (error) {
     console.log(error);
  }
};

export const actionToUpdateBooking = (payload:any) => async (dispatch:any) => {
  api.post('/booking',payload).then((res)=>{
    dispatch(actionToGetBookingData(0));
  })
};
export const actionToSendAlotNotification = (payload:any) => async (dispatch:any) => {
  console.log(payload)
  payload.notificationType = 'allot';

  let notifications = {
    location:payload.pickupPoint,
    details:payload,
  }

  try {
    api.get(`/user/${payload.allottedUserId}`).then(user=>{
      let userData = user.data;
      userData.notifications[payload.allottedBidId] = notifications;
      api.post('/user',userData);
    })
  } catch (error) {
    console.log(error);
  }
};
export const actionToUpdateBidding = (payload:any) => async (dispatch:any,useState:any) => {
  api.post('/bid',payload);
  let bidData = useState().biddingDetailByBookingId.bidData;
  let newBidData:any = [];
  bidData.map((bid:any)=>{
    if(bid.bidId != payload.bidId){
      bid.status = 'notApproved';
      api.post('/bid',bid);
    }else{
      bid.status = payload.status;
    }
    newBidData.push(bid);
  })

  dispatch({ type: BIDDING_DETAIL_BY_BOOKING_ID_SUCCESS, payload: {data:newBidData,sortBy:useState().biddingDetailByBookingId.sortBy,direction:useState().biddingDetailByBookingId.direction}});
};
export const actionToParmanentDeleteBooking = (id:any) => async (dispatch:any,useState:any) => {
  let bookingData = useState().bookingDetails.booking;
  bookingData.map((booking:any,key:any)=>{
    if(booking.bookingId == id){
      bookingData.splice(key,1);
    }
  })

  dispatch({ type: BOOKING_DETAIL_SUCCESS, payload: cloneDeep(bookingData) });
};

export const actionToGetBidingDataByBooking = (bookingData:any) => async (dispatch:any) => {
  dispatch({ type: BIDDING_DETAIL_BY_BOOKING_ID_REQUEST });
  try {
    const response = await api.get(`/bid/bookingId/${bookingData.bookingId}`);
    dispatch(actionToSortByBidData(response.data.bids,'amount','asc'));
  } catch (error) {
    dispatch({ type: BIDDING_DETAIL_BY_BOOKING_ID_FAIL, payload: error });
    console.log(error);
  }
};

export const actionToSetEditByBooking = (bookingData:any) => async (dispatch:any) => {
  dispatch({ type: BOOKING_DETAIL_FOR_EDIT, payload: bookingData });
};

export const actionToSortByBidData = (biddingData:any,sortBy:any,direction:any) => async (dispatch:any) => {
  let sortBiddingData = cloneDeep(biddingData);
  sortBiddingData.sort(function (a:any, b:any) {
    console.log(a[sortBy],b[sortBy])
    if(direction == 'asc')
      return a[sortBy] - b[sortBy];
    if(direction == 'desc')
      return b[sortBy] - a[sortBy];
  });

  dispatch({ type: BIDDING_DETAIL_BY_BOOKING_ID_SUCCESS, payload: {data:sortBiddingData,sortBy:'amount',direction:'asc'}});
}
export const actionToSetCarDataToEdit = (carData:any) => async (dispatch:any) => {
  dispatch({ type: UPDATE_CAR_DATA,payload:carData });
};
