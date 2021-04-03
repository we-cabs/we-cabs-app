import { IonPage,IonRow,IonCol,IonItem,IonLabel,IonInput,IonButton, IonTextarea, IonDatetime, IonAlert, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
import React,{useState} from 'react';
import { useSelector,RootStateOrAny } from 'react-redux';
import './AddDetailToGetBooking.css';
import { RouteComponentProps } from 'react-router';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const AddDetailToGetBooking: React.FC<RouteComponentProps> = ({match, history}) => {
  const dispatch = useDispatch();

  const [pickupPoint, setPickUpPoint] = useState<string>("");
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [dropPoint, setDropPoint] = useState<string>("");
  const [pickupTime, setPickUpTime] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [tripType, setTripType] = useState<string>("");
  const [distance, setDistance] = useState<number>(0);
  const [expiryTime, setExpiryTime] = useState<string>("");
  const [customerDetail, setCustomerDetail] = useState<string>("");

  const cabType = useSelector((state:RootStateOrAny) => state.cabType);
  const resetForm = () =>{
    setOnSubmit(true);
    setPickUpPoint('');
    setDropPoint('');
    setPickUpTime('');
    setCarType('');
    setDistance(0);
    setMaxAmount(0);
    setExpiryTime('');
    setCustomerDetail('');
    setTripType('');
  }
  const formSubmitHandler =(e:any)=>{
    e.preventDefault();
    const bookingData = {
      pickupPoint,
      dropPoint,
      pickupTime:moment(pickupTime).valueOf(),
      carType,
      tripType,
    }
// console.log('bookingData',bookingData)
//     dispatch(addBookingData(bookingData));
     resetForm();
  }
    return (
        <IonPage>
         <SubPageHeaderComponent title={"Get Booking"}/>
         <IonContent>
             <div className="add_bidding_inner_coontainer">
             <form id={"add_booking_form"} className="ion-padding" onSubmit={(e)=>formSubmitHandler(e)}>
             <IonAlert
                isOpen={onSubmit}
                onDidDismiss={() => setOnSubmit(false)}
                cssClass="my-custom-class"
                header={"Success!"}
                message={"Successfully added booking."}
                buttons={["Dismiss"]}/>
                <IonItem>
                  <IonLabel position="floating">Car Type</IonLabel>
                  {(cabType != undefined && cabType.length) ? 
                     <IonSelect onIonChange={(e)=>setCarType(e.detail.value)}>
                       {cabType.map((car:any,key:number)=>(
                          <IonSelectOption key={key}>{car}</IonSelectOption>
                       ))}
                     </IonSelect>
                     :''}
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Trip Type</IonLabel>
                  <IonSelect onIonChange={(e)=>setTripType(e.detail.value)}>
                    <IonSelectOption value="oneWay">One Way</IonSelectOption>
                    <IonSelectOption value="roundTrip">Round Trip</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Pick Up Point</IonLabel>
                  <IonInput onIonChange={(e)=>setPickUpPoint(e.detail.value || '')} value={pickupPoint} type="text" required/>
                </IonItem>
               
                <IonItem>
                  <IonLabel position="floating">Date Time</IonLabel>
                  <IonDatetime onIonChange={(e)=>setPickUpTime(e.detail.value || '')}  value={pickupTime} displayFormat="DD MMM hh:mm a"  displayTimezone="utc"/>
                </IonItem>
            
               
                <IonButton className="ion-margin-top enter_detail_button" type="submit" expand="block">
                  Add Booking
                </IonButton>
              </form>
             </div>
       </IonContent>
        </IonPage>
    );
  }

export default AddDetailToGetBooking;