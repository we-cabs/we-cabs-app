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

export const actionToAddCarData = (payload:any) => async (dispatch:any) => {
    dispatch(actionToAddCarImage(payload.image)).then((url:any)=>{
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
            },
            carPlate: url
       }
       try {
         api.post('/car',insertData).then((res=>{
           dispatch(actionToGerSelectedUserCarData(payload.userId));
         }));
      } catch (error) {
         console.log(error);
      }
    });
};
export const actionToAddCarImage = (image:any) => async (dispatch:any) => {
    // Get the presigned URL
    const {data} = await Axios({
      method: 'GET',
      url: API_ENDPOINT+'?wecab'+Math.round(Math.random())+'.jpg'
    })
    let binary = atob(image.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
    const result = await fetch(data.uploadURL, {
      method: 'PUT',
      body: blobData
    })
    return data.uploadURL.split('?')[0]; 
};