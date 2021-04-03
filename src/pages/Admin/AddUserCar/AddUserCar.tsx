import { IonPage,IonRow,IonCol,IonItem,IonLabel,IonInput,IonButton, IonTextarea, IonDatetime, IonAlert, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
import React,{useState} from 'react';
import { useSelector,RootStateOrAny } from 'react-redux';
import './AddUserCar.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import { useDispatch } from 'react-redux';
import { addBookingData } from '../../../actions/BookingAction';
import moment from 'moment';
import $ from 'jquery';
import { actionToAddCarData } from '../../../actions/AdminAction';

const AddUserCar: React.FC<RouteComponentProps> = ({match, history}) => {
  const dispatch = useDispatch();
  const selectedUserDataid = useSelector((state:RootStateOrAny) => state.selectedUserDataid);
  const [rcNo, setRcNo] = useState<string>("");
  const [carName, setCarName] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [chasisNo, setChasisNo] = useState<string>('');
  const [licenseNo, setLicenseNo] = useState<string>("");
  const [manufacturingYear, setManufacturingYear] = useState<string>("");
  const [vichelAddress, setVichelAddress] = useState<string>("");
  
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);

  const cabType = useSelector((state:RootStateOrAny) => state.cabType);

  const resetForm = () =>{
    setCarName('');
    setCarType('');
    setManufacturingYear('');
    setRcNo('');
    setChasisNo('');
    setLicenseNo('');
    setVichelAddress('');
    setImage(null);
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
    console.log('bookingData g',carData);
    dispatch(actionToAddCarData(carData));
    setOnSubmit(true);
    resetForm();
  }

  const onFileChange = (e:any) => {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    createImage(files[0])
  }
  const createImage = (file:any) => {
    // var image = new Image()
    let reader = new FileReader()
    reader.onload = (e:any) => {
      if (!e.target.result.includes('data:image/jpeg')) {
        return alert('Wrong file type - JPG only.')
      }
      if (e.target.result.length > 1000000000) {
        return alert('Image is loo large.')
      }
      setImage(e.target.result);
    }
    reader.readAsDataURL(file)
  }

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
                    {(image == null) ? 
                        <input type="file" accept="image/*" onChange={(e)=>onFileChange(e)}/>
                        :  
                        <div className="car_uploaded_image">
                          <img src={image} />
                        </div>
                    }

                  </IonItem>
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