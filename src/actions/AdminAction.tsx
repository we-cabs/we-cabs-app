import Axios from 'axios';
import { SELECTED_USER_CAR_FAIL, SELECTED_USER_CAR_REQUEST, SELECTED_USER_CAR_SUCCESS, SELECTED_USER_DATA } from '../constants/AdminConstants';

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
let imagesUrl:any = [];
export const actionToAddNewUpdatedImageUrl = (payload:any) => async (dispatch:any) => {
  imagesUrl = payload;
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
export const actionToAddCarImage = (image:any) => async (dispatch:any) => {
    // Get the presigned URL
    const {data} = await Axios({
      method: 'GET',
      url: API_ENDPOINT+'?wecab'+Math.random()+'.jpg'
    })
    let binary = atob(image.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
    await fetch(data.uploadURL, {
      method: 'PUT',
      body: blobData
    })
    imagesUrl.push(data.uploadURL.split('?')[0]);
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