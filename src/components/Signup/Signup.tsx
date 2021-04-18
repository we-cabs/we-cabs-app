import { IonPage,IonRow,IonCol,IonItem,IonLabel,IonInput,IonButton, IonTextarea, IonDatetime, IonAlert, IonSelect, IonSelectOption, IonContent, IonSlides, IonSlide } from '@ionic/react';
import React,{useEffect, useState} from 'react';
import { useSelector,RootStateOrAny,useDispatch } from 'react-redux';
import './Signup.css';
import { RouteComponentProps } from 'react-router';
import moment from 'moment';
import $ from 'jquery';
import { actionToUpdatedUserImageUrl, actionToAddUserImage,actionToUpdatedUserDocImageUrl, actionToRemoveUserDocImage, actionToAddUserDocImage, actionToUpdateUserData } from '../../actions/AdminAction';
import { cloneDeep } from 'lodash';
import Loader from '../Loader/Loader';

export const Signup = ()=>{
  const dispatch = useDispatch();

  const [location, setLocation] = useState<string>('');
  const [approvalStatus, setApprovalStatus] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [image, setImage] = useState<any>([]);
  const [role, setRole] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  const [profileImgUrl, setProfileImgUrl] = useState<string>('');

  const resetForm = () =>{
    //history.goBack();
  }
  const formSubmitHandler =(e:any)=>{
    e.preventDefault(); 
    const userData = {
        userId:phone,
        phone,
        location,
        approvalStatus,
        email,
        name,
        password,
        role,
    }
    dispatch(actionToUpdateUserData(userData));
    document.location.href = '/';
    setOnSubmit(true);
    resetForm();
  }
 
    const onFileChange = (e:any) => {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        setTimeout(function(){
            createImage(files[0]);
        },1000)

    } 
  function createImage(file:any){
    var reader = new FileReader()
      reader.onload = (e:any) => {
        if (!e.target.result.includes('data:image/')) {
          return alert('Wrong file type - IMAGE only.')
        }
        if (e.target.result.length > 100000000) {
          return alert('Image is loo large.')
        } 
        dispatch(actionToAddUserImage(profileImgUrl,e.target.result));
        setProfileImgUrl(e.target.result);
      }
      reader.readAsDataURL(file)
  }

    const openImageUploadPopup = (id:any) =>{
        $(id).trigger('click');
    }
    const removeImage = (images:any,key:any) =>{
        dispatch(actionToRemoveUserDocImage(key));
        images.splice(key,1);
        setImage([]);
        setImageLoading(true);
        setTimeout(function(){
          setImage([...images]);
          setImageLoading(false);
        },500)
      }
    

      const onDocFileChange = (e:any) => {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        setTimeout(function(){
            createDocImage(files);
        },1000)
    
      }
      function createDocImage(files:any){
        let images:any = []
        if(image != null && image.length)
            images = cloneDeep(image);
        
        for (var i = 0, f; f = files[i]; i++) { 
          var reader = new FileReader()
          reader.onload = (e:any) => {
            if (!e.target.result.includes('data:image/')) {
              return alert('Wrong file type - IMAGE only.')
            }
            if (e.target.result.length > 1000000000) {
              return alert('Image is loo large.')
            } 
            images.push(e.target.result);
            dispatch(actionToAddUserDocImage(e.target.result));
            setImage([...images]);
            setImageLoading(false);
          }
          reader.readAsDataURL(f)
        }
      }



    useEffect(()=>{
        dispatch(actionToUpdatedUserImageUrl('https://reqres.in/img/faces/4-image.jpg'));
        dispatch(actionToUpdatedUserDocImageUrl([]));
    },[])

    return (
        <IonPage>
         <IonRow>
          <IonCol>
            <div className="login_logo_container">
              <svg viewBox="0 0 1532.74 582.55"><g fill="#da272e"><path d="M575.9 555.3c2.26 0 3.4 1.47 3.4 4.39q0 5.45-9.87 13.42a30.78 30.78 0 0 1-19.1 8 20.63 20.63 0 0 1-15-7 28.42 28.42 0 0 1-6.85-20.56 78.74 78.74 0 0 1 7.17-30.55 85.15 85.15 0 0 1 17.75-27.32 30.14 30.14 0 0 1 20.66-10.55 11.4 11.4 0 0 1 9.57 4.74 17.84 17.84 0 0 1 3.59 11.08 41.94 41.94 0 0 1-.81 9.87 9.7 9.7 0 0 1-3.45 5.13 7.78 7.78 0 0 1-4.3 2.13 3.66 3.66 0 0 1-2.95-1.6 6.81 6.81 0 0 1-1.26-4.32 29.25 29.25 0 0 1 .77-5.51 32.46 32.46 0 0 0 .72-6.05c0-2.72-.71-4.09-2.11-4.09a21.45 21.45 0 0 0-14.46 9.13 82.55 82.55 0 0 0-13.72 22.67 62.81 62.81 0 0 0-5.71 23.91 21.38 21.38 0 0 0 3 11.62 9.74 9.74 0 0 0 8.77 4.74 21.49 21.49 0 0 0 8.58-2.43 36.69 36.69 0 0 0 9.56-6.58c2.96-2.87 4.98-4.26 6.05-4.27zm23.95-11.34a77.36 77.36 0 0 1 14.14-16.94 13.84 13.84 0 0 1 10.39-3.51 7.24 7.24 0 0 1 5.24 3.39 28.8 28.8 0 0 1 1.3 13.87 70.56 70.56 0 0 0-.12 8.48 49.56 49.56 0 0 0 .68 5.83 17.81 17.81 0 0 0 1.7 5 5.89 5.89 0 0 1 .7 3.47 4 4 0 0 1-1.8 2.7 4.49 4.49 0 0 1-3.35.85 7.73 7.73 0 0 1-5.65-5.19 25 25 0 0 1-1.51-12.26 76.84 76.84 0 0 0 .37-11.94c-.25-1.77-.94-2.75-2.07-2.92q-2.31-.35-10.46 8.86a152.73 152.73 0 0 0-12 14.86 33.44 33.44 0 0 1-3.71 5.56 3 3 0 0 1-2.66 1 5.78 5.78 0 0 1-3.73-1.9 4.75 4.75 0 0 1-1-4c.6-2.46 1.33-4.88 2.17-7.27q7.55-23 14.06-49.26a19.11 19.11 0 0 1 3.75-8.48c1.45-1.45 2.67-2.1 3.68-1.95a4.71 4.71 0 0 1 3.39 2.34 7.48 7.48 0 0 1 .81 5.24 69.48 69.48 0 0 1-2.74 11.19q-2 6.26-7 19.89-3.05 8.27-4.58 13.09zM678.2 557q-12.45 15.53-24.07 15.54a9.89 9.89 0 0 1-7.35-3.18 11.13 11.13 0 0 1-3.08-8.1 40.53 40.53 0 0 1 11.18-25.27q11.19-13.41 22.56-13.41a7.3 7.3 0 0 1 7.57 5.51c3.64 0 5.45 1.32 5.46 4a40.7 40.7 0 0 1-1.05 6.78 77.55 77.55 0 0 0-1.89 14.71 27 27 0 0 0 .83 8.06 27.42 27.42 0 0 0 1.2 3 4.72 4.72 0 0 0 2.26 1.52c1.27.57 1.9 1.36 1.9 2.38a4.42 4.42 0 0 1-2.44 3.8 9.58 9.58 0 0 1-5.09 1.53q-8.89 0-7.99-16.87zm-2.83-24.85q-4.78 0-12.44 10a30.23 30.23 0 0 0-7.65 17c0 2.44.53 3.67 1.6 3.67q5.6 0 13.77-9.38a27 27 0 0 0 8.17-16.4 5.46 5.46 0 0 0-1.07-3.56 3.06 3.06 0 0 0-2.39-1.31zm49.77-39.58q4.78.6 4.09 6.22a25.85 25.85 0 0 1-1.37 5.46q-1 2.9-5.49 14.26a136.68 136.68 0 0 0-5.65 18.15 149.92 149.92 0 0 0-3.11 15.57 143.85 143.85 0 0 0-1 14.46l-.14 2.83a6.88 6.88 0 0 1-2.56 4.65 5.88 5.88 0 0 1-4.53 1.51 4.53 4.53 0 0 1-4-3.74 32.27 32.27 0 0 1 .09-11.09 252.89 252.89 0 0 1 8.6-38.86 121.5 121.5 0 0 1 9.36-26q2.87-3.78 5.71-3.42zm37.9 61.33a35.7 35.7 0 0 1-11.39 17.66 26 26 0 0 1-16.77 7.19 14 14 0 0 1-10.92-4.86 17.35 17.35 0 0 1-4.3-11.93 39.17 39.17 0 0 1 7.88-22.74 23 23 0 0 1 19.12-11.19 15.42 15.42 0 0 1 12.4 5.66 20.37 20.37 0 0 1 4.74 13.5 29.41 29.41 0 0 1-.76 6.67zm-23.28-14.14a29.06 29.06 0 0 0-6.13 8.87 27.36 27.36 0 0 0-3 12.22 12.3 12.3 0 0 0 1.37 6.13 4 4 0 0 0 3.6 2.42 16.51 16.51 0 0 0 11.55-6.58 21.39 21.39 0 0 0 6-14.77 13.58 13.58 0 0 0-2-7.59 6.15 6.15 0 0 0-5.44-3 8.88 8.88 0 0 0-5.95 2.26zm91.89 42.79q-4.26-.52-5.93-6.13a27.79 27.79 0 0 1-.13-13.28q-13.81 17.63-25.45 16.2a8.83 8.83 0 0 1-7.08-5.24 19.56 19.56 0 0 1-1.56-11.36 46.58 46.58 0 0 1 12.74-25.73q11.1-12.21 20.84-11a9 9 0 0 1 7.54 4.38q5.4-16.58 6.53-20.75a79.36 79.36 0 0 1 3.49-10.18 8.43 8.43 0 0 1 3.2-3.69 5.48 5.48 0 0 1 3.32-1 3.81 3.81 0 0 1 3.21 2.6 11.31 11.31 0 0 1 .53 5.65 49.69 49.69 0 0 1-3 8.1 263.54 263.54 0 0 0-9.21 26.31 157.41 157.41 0 0 0-5.79 24.89m-11.07-26.25q-5.82-.7-13.41 8.89a37.28 37.28 0 0 0-8.63 18.18c-.4 3.35.46 5.16 2.59 5.41q5.43.66 14.3-9.67a36.28 36.28 0 0 0 9.66-16.85 5.58 5.58 0 0 0-1-3.82 4.66 4.66 0 0 0-3.53-2.16zm29.92 5.38h0q2.11-8 2.22-9.16a10 10 0 0 1 1.93-5.41 4.58 4.58 0 0 1 4.22-1.88 7.14 7.14 0 0 1 4.61 1.83 4.17 4.17 0 0 1 1.42 3.36 34 34 0 0 1-2.26 7.22l-.35 1a80.64 80.64 0 0 0-4.15 13.8l-1.24 8.74a38.4 38.4 0 0 0 .32 7.35 10.14 10.14 0 0 1 0 1.35c-.06.68-.79 1.55-2.18 2.6a6.2 6.2 0 0 1-4.32 1.39q-5.88-.51-5.12-9.43a99.3 99.3 0 0 1 3.72-18.28l1.18-4.48zm47.33-48.22q4.76.9 3.65 6.79a28.28 28.28 0 0 1-1.75 5.68q-1.24 3-6.5 14.76a155.49 155.49 0 0 0-6.93 18.87q-3.09 10.34-4.2 16.27-1.2 6.33-2 15.22l-.33 3a7.54 7.54 0 0 1-2.9 4.78 5.78 5.78 0 0 1-4.63 1.36 4.58 4.58 0 0 1-3.77-4.17 36.6 36.6 0 0 1 .87-11.71 282.29 282.29 0 0 1 11.36-40.57 135.4 135.4 0 0 1 11.19-26.92c2.09-2.59 4.07-3.71 5.94-3.36z"/><path d="M944.25 564.22q.57-2.35-5.45-8a36.65 36.65 0 0 1-8.77-10.95 10.88 10.88 0 0 1-.22-7.42 16.75 16.75 0 0 1 12.79-10.35 30.37 30.37 0 0 1 17.61-.41q7.17 2.39 5.09 8.62a4 4 0 0 1-2.63 2.44 5.17 5.17 0 0 1-3.22.39 4.86 4.86 0 0 1-1.46-1.13 4.93 4.93 0 0 0-1.63-1.2 18.3 18.3 0 0 0-9.18-.21c-3.59.7-5.77 2.18-6.52 4.44a4.69 4.69 0 0 0 .57 3.74 28.64 28.64 0 0 0 5.29 6.07 31.74 31.74 0 0 1 7.61 9.51 10 10 0 0 1 .27 7q-2.06 6.21-11.82 7.56a44.18 44.18 0 0 1-20.21-2.11q-7.7-2.55-5.85-8.12a4.77 4.77 0 0 1 2.77-2.94 5.47 5.47 0 0 1 4.09-.25 8.71 8.71 0 0 1 2.31 1.42 9.37 9.37 0 0 0 2.93 1.7 31.35 31.35 0 0 0 8.8 1.5 11.64 11.64 0 0 0 6.83-1.3zm60.99-3.03q0 4.65-7.84 11.12a27.05 27.05 0 0 1-17.68 6.47 15.31 15.31 0 0 1-11.91-4.77 19 19 0 0 1-4.34-13.27 36.75 36.75 0 0 1 8.86-23.5 24.77 24.77 0 0 1 18.94-11c5.869-.248 10.831 4.302 11.09 10.17v.58a20.47 20.47 0 0 1-7.48 14.84 40.59 40.59 0 0 1-19.15 9.74 1.53 1.53 0 0 0-1.34 1.61 5.8 5.8 0 0 0 1.9 4.1 6.78 6.78 0 0 0 5.09 1.94 25.24 25.24 0 0 0 17.85-9.28 4.7 4.7 0 0 1 3.36-1.8c1.75 0 2.65 1.05 2.65 3.05zm-30-7.92a27.11 27.11 0 0 0 12.44-6.05 12.31 12.31 0 0 0 5.4-8.37 3.83 3.83 0 0 0-.83-2.48 2.66 2.66 0 0 0-2.13-1 12.64 12.64 0 0 0-8.64 5.73 29.77 29.77 0 0 0-6.25 12.17zm-115.4-43.04a19.46 19.46 0 0 0 2.26 5.48l1.7 3a.93.93 0 0 0 .95.45l3.4-.57a19.06 19.06 0 0 0 5.65-1.77 9.27 9.27 0 0 0 3.74-3.42 5.31 5.31 0 0 0-1.47-7.37 5.64 5.64 0 0 0-.53-.31 5.22 5.22 0 0 1-8.2-3.87 5.33 5.33 0 0 0-7 2.79 3.62 3.62 0 0 0-.2.55 9.12 9.12 0 0 0-.3 5.04z"/><rect width="1532.74" height="425.27" rx="11.31"/></g><g fill="#fff"><path d="M190.91 303.94l-34.25 54.09-86.68-190.11h61.61l38.37 91.68m200.84-91.68l-86.68 190.11-63.76-100.62-14.63 23.06-21.54-50.06 36.17-74 59.45 100 33.94-88.48zm150.86 7.88c21.86 18 29.21 42 32.43 70.49.34 3-.29 10.26-.27 13.82-48.74 2.39-96.22 13.32-144.74 19.1 4.71 13.48 9.89 23.59 22.39 30.94a60.34 60.34 0 0 0 40.37 7.05 47.8 47.8 0 0 0 26.28-14.37c6.61-7 10.18-14.21 16.76-20.57 11 8.36 23.23 11.81 35.73 16.88a77.63 77.63 0 0 1-26.42 38.33 99.29 99.29 0 0 1-45.85 19.4 110.57 110.57 0 0 1-55.57-6.09 84 84 0 0 1-39.5-31.27 119.36 119.36 0 0 1-12.57-104.77 83.64 83.64 0 0 1 29.76-38.76 98.28 98.28 0 0 1 48.13-17.64c26.78-2.62 51.21-.53 73.07 17.46zm-99.17 40.1c-9 8.07-11.82 17.5-14.09 29.23l101.34-12.25a38.5 38.5 0 0 0-19-25 61.13 61.13 0 0 0-36-5.29 57.4 57.4 0 0 0-32.25 13.31zm230.74 125.88a130.4 130.4 0 0 1-50.83-51.17 162.89 162.89 0 0 1 0-149.56 130.46 130.46 0 0 1 50.83-51.17 147.89 147.89 0 0 1 74.09-18.45 136.39 136.39 0 0 1 102 42.85l-30.49 28.56a94.5 94.5 0 0 0-70-29 100.4 100.4 0 0 0-51.22 12.89 90.28 90.28 0 0 0-34.8 36.1 118.36 118.36 0 0 0 0 105.92 90.28 90.28 0 0 0 34.8 36.1 100.4 100.4 0 0 0 51.22 12.89 104 104 0 0 0 39.68-7.74 101.9 101.9 0 0 0 33.43-22l29.32 30.94a140.87 140.87 0 0 1-103.61 41.25 148.56 148.56 0 0 1-74.42-18.41zm389.66-179v193.15h-40.87l-.4-25.8a80.11 80.11 0 0 1-31.05 22.09 109.53 109.53 0 0 1-42.5 8 104.68 104.68 0 0 1-52.1-12.71 89.53 89.53 0 0 1-35.35-35.77 114.67 114.67 0 0 1 0-104.78 89.68 89.68 0 0 1 35.35-35.78 104.89 104.89 0 0 1 52.1-12.71 109.54 109.54 0 0 1 42.5 8 80 80 0 0 1 31.05 22.09l.4-25.8zm-62.93 140.56c22.875-24.874 22.875-63.126 0-88-25.363-22.679-63.717-22.679-89.08 0-22.875 24.874-22.875 63.126 0 88 25.363 22.679 63.717 22.679 89.08 0zm261.76-135.2a89.33 89.33 0 0 1 33.82 35.91 123.57 123.57 0 0 1 0 107.55 89.33 89.33 0 0 1-33.82 35.91 94.28 94.28 0 0 1-48.88 12.7 101.62 101.62 0 0 1-41.25-8.07 76.43 76.43 0 0 1-29.91-22.41l-.4 26.19h-39.09V78.12h43.79v102.79a82.09 82.09 0 0 1 28.93-18.67 103 103 0 0 1 37.93-6.74 94.22 94.22 0 0 1 48.88 12.64zm-14.07 134.33c21.891-25.738 21.891-63.552 0-89.29-23.676-23.022-61.374-23.022-85.05 0-22.161 25.638-22.161 63.652 0 89.29 23.671 23.027 61.368 23.036 85.05.02zm76.77 35.67v-40.37c8.84 6.64 25.3 11 37.63 14.67a132 132 0 0 0 38.18 5.55 63.42 63.42 0 0 0 29.33-5.55 17.28 17.28 0 0 0 10.44-15.88 16.66 16.66 0 0 0-10.24-15.3 97.2 97.2 0 0 0-33.15-7.65q-39-3.45-60.09-18.56a46.56 46.56 0 0 1-21.1-39.59 45.82 45.82 0 0 1 10.85-30.22 70.7 70.7 0 0 1 30.34-20.28 128 128 0 0 1 44.81-7.27c30.55 0 47.09 4.44 69.06 19v35.89a148 148 0 0 0-67-18.52 75.69 75.69 0 0 0-32.55 5.54 17.29 17.29 0 0 0-11.26 15.88 15.82 15.82 0 0 0 9.44 14.35 89 89 0 0 0 31.15 7.46q44.21 4.59 64.3 18.75a47 47 0 0 1 20.09 40.93 47.61 47.61 0 0 1-10.65 30.79 69.59 69.59 0 0 1-30.14 20.66 124.61 124.61 0 0 1-44.81 7.46c-33.52-.01-48.37.89-74.63-17.74z"/><circle cx="728.87" cy="218.61" r="29.8"/></g><path d="M0 538.39h458.12v5.66H0zm1080.27-5.65h452.47v11.31h-452.47z" fill="#da272e"/></svg>
            </div>
          </IonCol>
        </IonRow>
         <IonContent>
         <IonAlert
                isOpen={onSubmit}
                onDidDismiss={() => setOnSubmit(false)}
                cssClass="my-custom-class"
                header={"Success!"}
                message={"Successfully added user."}
                buttons={["Dismiss"]}/>

              <form id={"add_booking_form"} className="ion-padding" onSubmit={(e)=>formSubmitHandler(e)}>
                 <IonRow>
                   <IonCol>
                     <div className="signup_token_label">
                       Your Name:
                     </div>
                     <input className="signup_inout_section" type="text" placeholder="Enter your Name" required></input>
                   </IonCol>
                 </IonRow>
                 <IonRow>
                   <IonCol>
                     <div className="signup_token_label">
                      Email:
                     </div>
                     <input className="signup_inout_section" type="email" placeholder="Enter your Email" required></input>
                   </IonCol>
                 </IonRow>
                 <IonRow>
                   <IonCol>
                     <div className="signup_token_label">
                      Phone Number:
                     </div>
                     <input className="signup_inout_section" type="text" placeholder="Enter your Phone Number" required></input>
                   </IonCol>
                 </IonRow>
                 <IonRow>
                   <IonCol>
                     <div className="signup_token_label">
                     Password:
                     </div>
                     <input className="signup_inout_section" type="password" placeholder="Enter Password" required></input>
                   </IonCol>
                 </IonRow>
                 <IonRow>
                   <IonCol>
                     <div className="signup_token_label">
                     Address:
                     </div>
                     <textarea className="signup_inout_section" cols={4} placeholder="Enter Your Address" required></textarea>
                   </IonCol>
                 </IonRow>
                 <IonRow>
                   <IonCol>
                     <div className="signup_token_label">
                     Profile picture:
                     </div>
                     <input type="file" className="select_profile_input" onChange={(e)=>onFileChange(e)} accept="image"></input>
                   </IonCol>
                 </IonRow>
                 <IonRow>
                   <IonCol>
                      <div className="signup_already_have_account_div">
                         <button type="submit">Signup</button>
                         &nbsp;
                         &nbsp;
                         <span className="signin_new_user">Already Have Account?</span>
                         <span className="signin_new_user_link"> Login</span>
                      </div>
                   </IonCol>
                 </IonRow>
              </form>
       </IonContent>
        </IonPage>
    );
  }
