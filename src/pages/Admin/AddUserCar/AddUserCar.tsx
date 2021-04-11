import { IonPage,IonRow,IonCol,IonItem,IonLabel,IonInput,IonButton, IonTextarea, IonDatetime, IonAlert, IonSelect, IonSelectOption, IonContent, IonSlides, IonSlide } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import { useSelector,RootStateOrAny,useDispatch } from 'react-redux';
import './AddUserCar.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import { addBookingData } from '../../../actions/BookingAction';
import moment from 'moment';
import $ from 'jquery';
import { actionToAddCarData, actionToAddCarImage, actionToAddNewUpdatedImageUrl, actionToRemoveCarImage } from '../../../actions/AdminAction';
import Loader from '../../../components/Loader/Loader';
import { cloneDeep } from 'lodash';

const AddUserCar: React.FC<RouteComponentProps> = ({match, history}) => {
  const dispatch = useDispatch();
  const selectedUserDataid = useSelector((state:RootStateOrAny) => state.selectedUserDataid);
  const [rcNo, setRcNo] = useState<string>("");
  const [carName, setCarName] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [chasisNo, setChasisNo] = useState<string>('');
  const [licenseNo, setLicenseNo] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [manufacturingYear, setManufacturingYear] = useState<string>("");
  const [vichelAddress, setVichelAddress] = useState<string>("");
  
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  const [image, setImage] = useState<any>([]);

  const cabType = useSelector((state:RootStateOrAny) => state.cabType);

  const resetForm = () =>{
    setCarName('');
    setCarType('');
    setManufacturingYear('');
    setRcNo('');
    setChasisNo('');
    setLicenseNo('');
    setVichelAddress('');
    setImage([]);
  }
  const formSubmitHandler =(e:any)=>{
    e.preventDefault();
    const carData = {
        userId:selectedUserDataid,
        carType,
        carName,
        rcNo,
        chasisNo,
        licenseNo,
        vichelAddress,
        manufacturingYear:moment(manufacturingYear).format("YYYY"),
        image
    }
    dispatch(actionToAddCarData(carData));
    setOnSubmit(true);
    resetForm();
  }

  const onFileChange = (e:any) => {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    setTimeout(function(){
      createImage(files);
    },1000)
  }
  function createImage(files:any){
    let images:any = []
    if(image != null && image.length)
        images = cloneDeep(image);
    for (var i = 0, f; f = files[i]; i++) { 
      var reader = new FileReader()
      reader.onload = (e:any) => {
        if (!e.target.result.includes('data:image/jpeg')) {
          return alert('Wrong file type - JPG only.')
        }
        if (e.target.result.length > 1000000000) {
          return alert('Image is loo large.')
        } 
        images.push(e.target.result);
        dispatch(actionToAddCarImage(e.target.result));
        setImage([...images]);
        setImageLoading(false);
      }
      reader.readAsDataURL(f)
    }
  }
  const removeImage = (images:any,key:any) =>{
    images.splice(key,1);
    setImage([]);
    setImageLoading(true);
    setTimeout(function(){
      setImage([...images]);
      setImageLoading(false);
    },500)

    dispatch(actionToRemoveCarImage(key));

  }

  useEffect(()=>{
    dispatch(actionToAddNewUpdatedImageUrl([]));
  },[])

    return (
        <IonPage>
         <AdminSubHeader title={"Add Car"}/>
         <IonContent>
             <div className="add_bidding_inner_coontainer">
             <form id={"add_booking_form"} className="ion-padding" onSubmit={(e)=>formSubmitHandler(e)}>
             <IonAlert
                isOpen={onSubmit}
                onDidDismiss={() => setOnSubmit(false)}
                cssClass="my-custom-class"
                header={"Success!"}
                message={"Successfully added car."}
                buttons={["Dismiss"]}/>
                <IonItem>
                      <IonLabel position="stacked">CAR IMAGES</IonLabel>
                      <input type="file" accept="image/*" placeholder="Choose Document images" onChange={(e)=>{setImageLoading(true); onFileChange(e)}} multiple/>
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
                 <>
                 <IonSlides className="image-slider">
                    {image.map((img:any,key:any)=>(
                      <IonSlide style={{width:"150px",height:"200px"}} key={key}>
                        <img src={img} className="thumb-img"/>
                        <div onClick={()=>removeImage([...image],key)} className="remove_image_class"> Remove </div>
                      </IonSlide>
                    ))}
                 </IonSlides>
                </> 
             }
                  <IonItem>
                  <IonLabel position="floating">NAME</IonLabel>
                  <IonInput onIonChange={(e)=>setCarName(e.detail.value || '')} value={carName} type="text" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">TYPE</IonLabel>
                  <IonSelect value={carType} onIonChange={(e)=>setCarType(e.detail.value || '')}>
                      {cabType.map((cab:any,key:any)=>(
                         <IonSelectOption key={key}>{cab}</IonSelectOption>
                      ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">RC NO</IonLabel>
                  <IonInput onIonChange={(e)=>setRcNo(e.detail.value || '')} value={rcNo} type="text" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">CHASIS NO</IonLabel>
                  <IonInput  onIonChange={(e)=>setChasisNo(e.detail.value || '')} value={chasisNo} type="text" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">LICENSE NO</IonLabel>
                  <IonInput  onIonChange={(e)=>setLicenseNo(e.detail.value || '')} value={licenseNo} type="text" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">MANUFACTURING YEAR</IonLabel>
                  <IonDatetime onIonChange={(e)=>setManufacturingYear(e.detail.value || '')}  value={manufacturingYear} displayFormat="YYYY"  displayTimezone="UTC"/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">VICHEL REGISTRATION ADDRESS</IonLabel>
                  <IonTextarea  onIonChange={(e)=>setVichelAddress(e.detail.value || '')} value={vichelAddress} autoGrow rows={2} required/>
                </IonItem>
                <IonButton className="ion-margin-top" type="submit" expand="block">
                  Add Car
                </IonButton>
              </form>
             </div>
       </IonContent>
        </IonPage>
    );
  }

export default AddUserCar;