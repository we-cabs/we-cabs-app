import { IonPage,IonRow,IonCol,IonItem,IonLabel,IonInput,IonButton, IonTextarea, IonDatetime, IonAlert, IonSelect, IonSelectOption, IonContent, IonSlides, IonSlide } from '@ionic/react';
import React,{useEffect, useState} from 'react';
import { useSelector,RootStateOrAny,useDispatch } from 'react-redux';
import './UpdateUserData.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import { addBookingData } from '../../../actions/BookingAction';
import moment from 'moment';
import $ from 'jquery';
import { actionToUpdatedUserImageUrl, actionToAddUserImage,actionToUpdatedUserDocImageUrl, actionToRemoveUserDocImage, actionToAddUserDocImage, actionToUpdateUserData } from '../../../actions/AdminAction';
import Loader from '../../../components/Loader/Loader';
import { cloneDeep } from 'lodash';

const AddUser: React.FC<RouteComponentProps> = ({match, history}) => {
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
         <AdminSubHeader title={"Add User"}/>
         <IonContent>
             <div className="add_bidding_inner_coontainer">
             <form id={"add_booking_form"} className="ion-padding" onSubmit={(e)=>formSubmitHandler(e)}>
             <IonAlert
                isOpen={onSubmit}
                onDidDismiss={() => setOnSubmit(false)}
                cssClass="my-custom-class"
                header={"Success!"}
                message={"Successfully added user."}
                buttons={["Dismiss"]}/>
                   <IonItem>
                       {(profileImgUrl) ? 
                        <div className="user_profile_pic_update_user">
                            <div onClick={()=>openImageUploadPopup('#edit_image_input')} className="user_profile_image">
                                <img src={profileImgUrl}/>
                                <div className="edit_profile_picture_url">Edit</div>
                                <input type="file" id="edit_image_input" onChange={(e)=>onFileChange(e)} accept="image"></input>
                            </div>                         
                        </div>
                        :
                        <input type="file" onChange={(e)=>onFileChange(e)} accept="image"></input>
                       }
                  </IonItem>
                  <IonItem>
                  <IonLabel position="floating">NAME</IonLabel>
                  <IonInput onIonChange={(e)=>setName(e.detail.value || '')} value={name} type="text" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">PHONE NUMBER</IonLabel>
                  <IonInput onIonChange={(e)=>setPhone(e.detail.value || '')} value={phone} type="text" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">EMAIL</IonLabel>
                  <IonInput onIonChange={(e)=>setEmail(e.detail.value || '')} value={email} type="email" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">PASSWORD</IonLabel>
                  <IonInput onIonChange={(e)=>setPassword(e.detail.value || '')} value={password} type="text" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">ADDRESS</IonLabel>
                  <IonTextarea  onIonChange={(e)=>setLocation(e.detail.value || '')} value={location} autoGrow rows={2} required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">ROLE</IonLabel>
                  <IonSelect value={role} onIonChange={(e)=>setRole(e.detail.value || '')}>
                     <IonSelectOption value="admin">Admin</IonSelectOption>
                     <IonSelectOption value="driver">Driver</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">STATUS</IonLabel>
                  <IonSelect value={approvalStatus} onIonChange={(e)=>setApprovalStatus(e.detail.value || '')}>
                     <IonSelectOption value="approved">Approved</IonSelectOption>
                     <IonSelectOption value="notApproved">Not Approved</IonSelectOption>
                  </IonSelect>
                </IonItem>
                        <IonItem>
                           <IonLabel position="stacked">DOCUMENT IMAGES</IonLabel>
                            <input type="file" accept="image/*" placeholder="Choose Document images" onChange={(e)=>{setImageLoading(true);onDocFileChange(e)}} multiple/>
                        </IonItem>
                       {(!image.length && !imageLoading) ? 
                
                        ''
                        : (imageLoading) ? 
                        <>
                        <IonItem>
                          <Loader/>
                          </IonItem>
                        </>
                        :
                        <IonSlides className="image-slider">
                        {image.map((img:any,key:any)=>(
                          <IonSlide style={{width:"150px",height:"200px"}} key={key}>
                            <img src={img} className="thumb-img"/>
                            <div onClick={()=>removeImage([...image],key)} className="remove_image_class"> Remove </div>
                          </IonSlide>
                        ))}
                    </IonSlides>    
                    }
                <IonButton className="ion-margin-top" type="submit" expand="block">
                  Add User
                </IonButton>
              </form>
             </div>
       </IonContent>
        </IonPage>
    );
  }

export default AddUser;