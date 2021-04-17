import { IonPage,IonRow,IonCol,IonItem,IonLabel,IonInput,IonButton, IonTextarea, IonDatetime, IonAlert, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
import React,{useState} from 'react';
import { useSelector,RootStateOrAny } from 'react-redux';
import './AddDetailToGetBooking.css';
import { RouteComponentProps } from 'react-router';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { addDetailToGetBookingData } from '../../actions/BookingAction';

const AddDetailToGetBooking: React.FC<RouteComponentProps> = ({match, history}) => {
  const dispatch = useDispatch();

  const [pickupPoint, setPickUpPoint] = useState<string>("");
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  const [dropPoint, setDropPoint] = useState<string>("");
  const [pickupTime, setPickUpTime] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [tripType, setTripType] = useState<string>("");

  const cabType = useSelector((state:RootStateOrAny) => state.cabType);
  const resetForm = () =>{
    setOnSubmit(true);
    setPickUpPoint('');
    setDropPoint('');
    setPickUpTime('');
    setCarType('');
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

     dispatch(addDetailToGetBookingData(bookingData));
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
                message={"Successfully added booking request."}
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
                  <IonLabel position="floating">Drop Point</IonLabel>
                  <IonInput onIonChange={(e)=>setDropPoint(e.detail.value || '')} value={dropPoint} type="text" required/>
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