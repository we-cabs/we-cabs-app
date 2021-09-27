import Axios from 'axios';
import { useHistory } from "react-router";
import { SELECTED_USER_CAR_FAIL, SELECTED_USER_CAR_REQUEST, SELECTED_USER_CAR_SUCCESS, SELECTED_USER_DATA,EDIT_USER_DATA, ALL_BOOKING_REQUEST_DATA_REQUEST, ALL_BOOKING_REQUEST_DATA_SUCCESS, ALL_BOOKING_REQUEST_DATA_FAIL } from '../constants/AdminConstants';
import { Plugins,LocalNotification } from '@capacitor/core';
import { actionToGetBookingData } from './BookingAction';
const { LocalNotifications } = Plugins;
const api = Axios.create({
  baseURL: `https://a46jrcmngi.execute-api.us-west-2.amazonaws.com/dev`
})
const API_ENDPOINT = 'https://bbyocyuvlb.execute-api.us-west-2.amazonaws.com/uploads';

export const actionToGerSelectedUserCarData = (id:any) => async (dispatch:any) => {
  dispatch({ type: SELECTED_USER_DATA, payload: id });
  dispatch({ type: SELECTED_USER_CAR_REQUEST });
  try {
    const response = await api.get(`/car/userId/${id}`);
    dispatch({ type: SELECTED_USER_CAR_SUCCESS, payload: response.data.cars });
  } catch (error) {
    dispatch({ type: SELECTED_USER_CAR_FAIL, payload: error });
     console.log(error);
  }
};
export const actionToGetAllBookingDetailData = () => async (dispatch:any) => {
  dispatch({ type: ALL_BOOKING_REQUEST_DATA_REQUEST });
  try {
    const response = await api.get(`/request`);
    dispatch({ type: ALL_BOOKING_REQUEST_DATA_SUCCESS, payload: response.data.requests });
  } catch (error) {
    dispatch({ type: ALL_BOOKING_REQUEST_DATA_FAIL, payload: error });
     console.log(error);
  }
};
let imagesUrl:any = [];
let userDocImages:any = [];
let userImagesUrl:any = '';
export const actionToAddNewUpdatedImageUrl = (payload:any) => async (dispatch:any) => {
  imagesUrl = payload;
}
export const actionToUpdatedUserImageUrl = (payload:any) => async (dispatch:any) => {
  userImagesUrl = payload;
}
export const actionToUpdatedUserDocImageUrl = (payload:any) => async (dispatch:any) => {
  userDocImages = payload;
}

export const actionToAddCarData = (payload:any) => async (dispatch:any) => {
  let insertData = {
    linkedUserId: payload.userId,
    carManufactureYear: Number(payload.manufacturingYear),
    carDetails: {
        "name": payload.carName,
        "type": payload.carType,
        "rcno": payload.rcNo,
        "chasis": payload.chasisNo,
        "vichelAddress": payload.vichelAddress,
        "licenseNo": payload.licenseNo,
        "images":imagesUrl,
    },
    carPlate: payload.rcNo
}
console.log(insertData);
dispatch(actionToGeUpdateCarDataLocally(insertData));
try {
 api.post('/car',insertData).then((res=>{
  
 }));
} catch (error) {
 console.log(error);
}
};
export const actionToGeUpdateCarDataLocally = (insertData:any) => async (dispatch:any,useState:any) => {
  let selectedUserCarData = useState().selectedUserCarData.carData;
   if(selectedUserCarData != null && selectedUserCarData != undefined){
     let flag = false;
     selectedUserCarData.map((car:any,key:any)=>{
        if(car.carPlate == insertData.carPlate){
          selectedUserCarData[key] = insertData;
          flag = true;
        }
     })
     if(!flag){
      selectedUserCarData.unshift(insertData);
     }
   }else{
    selectedUserCarData = [insertData];
   }
  dispatch({ type: SELECTED_USER_CAR_SUCCESS, payload: selectedUserCarData });
}
export const actionToAddCarImage = (image:any) => (dispatch:any) => {
    // Get the presigned URL
    Axios({
      method: 'GET',
      url: API_ENDPOINT+'?wecab'+Math.random()+'.jpg'
    }).then((res)=>{
      imagesUrl.push(res.data.uploadURL.split('?')[0]);
      let binary = atob(image.split(',')[1])
      let array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
      fetch(res.data.uploadURL, {
        method: 'PUT',
        body: blobData
      })
    })
};
export const actionToRemoveCarImage = (key:any,url = '') => async (dispatch:any) => {
  if(url){
    fetch(url, {
      method: 'DELETE',
    })
  }else if(imagesUrl[key] != undefined){
    fetch(imagesUrl[key], {
      method: 'DELETE',
    })
  }
  imagesUrl.splice(key,1);
}

export const actionToRemoveUserDocImage = (key:any,url = '') => async (dispatch:any) => {
  if(url){
    fetch(url, {
      method: 'DELETE',
    })
  }else if(userDocImages[key] != undefined){
    fetch(userDocImages[key], {
      method: 'DELETE',
    })
  }
  imagesUrl.splice(key,1);
}

export const actionToSetEditUserData = (user:any) => async (dispatch:any) => {
  dispatch({ type: EDIT_USER_DATA, payload: user });
};

export const actionToAddUserImage = (preUrl:any,image:any) => (dispatch:any) => {
  fetch(preUrl, {
    method: 'DELETE',
  })
  // Get the presigned URL
  Axios({
    method: 'GET',
    url: API_ENDPOINT+'?wecab'+Math.random()+'.jpg'
  }).then((res)=>{
    userImagesUrl = res.data.uploadURL.split('?')[0];
    console.log(userImagesUrl)
    let binary = atob(image.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
    fetch(res.data.uploadURL, {
      method: 'PUT',
      body: blobData
    })
  })
};

export const actionToAddUserDocImage = (image:any) => (dispatch:any) => {
  // Get the presigned URL
  Axios({
    method: 'GET',
    url: API_ENDPOINT+'?wecab'+Math.random()+'.jpg'
  }).then((res)=>{
    userDocImages.push(res.data.uploadURL.split('?')[0]);
    let binary = atob(image.split(',')[1])
    let array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
    fetch(res.data.uploadURL, {
      method: 'PUT',
      body: blobData
    })
  })
};

export const actionToSendUserBalanceData = (id:any,notif:any) => async (dispatch:any) => {
  try {
    api.post(`/user/addNotificationPush/${id}?rand=`+Math.random(),notif);
  } catch (error) {
    console.log(error);
  } 

}


export const actionToShowNotification = (payload:any) => async () => {
  if (!(await LocalNotifications.requestPermission()).granted) return;
  const pending = await LocalNotifications.getPending();
  if (pending.notifications.length > 0)
    await LocalNotifications.cancel(pending);
    await LocalNotifications.schedule({
      notifications: [{
        title: payload.title,
        body: payload.body, 
        id: Math.random(),
      }] 
    });
}
export const actionToOpenNotificationSpecificPage = (payload:any,history:any) => async (dispatch:any) => {
  if(payload == 'user_detail'){
    history.push('/tabs/dashboard/my-profile');
  }else
  if(payload == 'booking_page'){
    dispatch(actionToGetBookingData(0));
    history.push(`/tabs/dashboard/bookingdetail`);
  }else
  if(payload == 'bidding_page'){
    history.push(`/tabs/bidding-list`);
  }
}

export const actionToUpdateUserBalanceData = (payload:any) => async (dispatch:any) => {
  console.log('payload',payload);
  let insertData1 = {
    "userId": payload.phone,
    "phone": payload.phone,
    "profileImgUrl": userImagesUrl,
    "approvalStatus": payload.approvalStatus,
    "email": payload.email,
    "name": payload.name,
    "location":payload.location,
    "password":payload.password,
    "notifications":payload.notifications,
    "balance":payload.balance,
    "role":payload.role,
    "images":{doc:userDocImages},
    "deviceToken":payload.deviceToken,
  }
  dispatch(actionToGeUpdateUserDataLocally(insertData1));
  try {
    api.get(`/user/${payload.phone}`).then(user=>{
      let userData = user.data;
      let insertData = {
        "userId": payload.phone,
        "phone": payload.phone,
        "profileImgUrl": userImagesUrl,
        "approvalStatus": payload.approvalStatus,
        "email": payload.email,
        "name": payload.name,
        "location":payload.location,
        "password":payload.password,
        "notifications":payload.notifications,
        "balance":payload.balance,
        "role":payload.role,
        "images":{doc:userDocImages},
        "deviceToken":userData.deviceToken,
      }
      console.log('insertData',insertData)
      dispatch(actionToGeUpdateUserDataLocally(insertData));

      try {
        api.post('/user',insertData);
      } catch (error) {
        console.log(error);
      }


    })
  } catch (error) {
    
  } 

}
export const actionToUpdateUserData = (payload:any) => async (dispatch:any) => {
  let insertData = {
        "userId": payload.phone,
        "phone": payload.phone,
        "profileImgUrl": userImagesUrl,
        "approvalStatus": payload.approvalStatus,
        "email": payload.email,
        "name": payload.name,
        "location":payload.location,
        "password":payload.password,
        "notifications":payload.notifications,
        "balance":payload.balance,
        "role":payload.role,
        "images":{doc:userDocImages},
        "deviceToken":payload.deviceToken,
}
  dispatch(actionToGeUpdateUserDataLocally(insertData));
  try {
    api.post('/user',insertData);
  } catch (error) {
    console.log(error);
  }
};


export const actionToGeUpdateUserDataLocally = (insertData:any) => async (dispatch:any,useState:any) => {
  let selectedUserUserData = useState().allUserData.userData;
   if(selectedUserUserData != null && selectedUserUserData != undefined){
     let flag = false;
     selectedUserUserData.map((car:any,key:any)=>{
        if(car.userId == insertData.userId){ 
          selectedUserUserData[key] = insertData;
          flag = true;
        }
     })
     if(!flag){
      selectedUserUserData.unshift(insertData);
     }
   }else{
    selectedUserUserData = [insertData];
   }
  dispatch({ type: SELECTED_USER_CAR_SUCCESS, payload: selectedUserUserData });
}