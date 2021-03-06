import { IonPage,IonRow,IonCol,IonItem,IonLabel,IonInput,IonButton, IonTextarea, IonDatetime, IonAlert } from '@ionic/react';
import React,{useState} from 'react';
import { useSelector,RootStateOrAny } from 'react-redux';
import './AddBooking.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import { useDispatch } from 'react-redux';
import { addBookingData } from '../../../actions/BookingAction';
import $ from 'jquery';

const AddBooking: React.FC<RouteComponentProps> = ({match, history}) => {
  const dispatch = useDispatch();

  const [pickupPoint, setPickUpPoint] = useState<string>("");
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  const [dropPoint, setDropPoint] = useState<string>("");
  const [pickupTime, setPickUpTime] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  const [distance, setDistance] = useState<number>(0);
  const [expiryTime, setExpiryTime] = useState<string>("");
  const [customerDetail, setCustomerDetail] = useState<string>("");
  const resetForm = () =>{
    setOnSubmit(true);
    setPickUpPoint('');
    setDropPoint('');
    setPickUpTime('');
    setCarType('');
    setDistance(0);
    setExpiryTime('');
    setCustomerDetail('');
  }
  const formSubmitHandler =(e:any)=>{
    e.preventDefault();
    const bookingData = {
      pickupPoint,
      dropPoint,
      pickupTime:new Date(pickupTime).valueOf(),
      carType,
      distance,
      expiryTime:new Date(expiryTime).valueOf(),
      customerDetail
    }
    dispatch(addBookingData(bookingData));
    resetForm();
  }
    return (
        <IonPage>
         <AdminSubHeader title={"Add Booking"}/>
          <div className="main_body_content_container">
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
                  <IonLabel position="floating">Pick Up Point</IonLabel>
                  <IonInput onIonChange={(e)=>setPickUpPoint(e.detail.value || '')} value={pickupPoint} type="text" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Drop Point</IonLabel>
                  <IonInput  onIonChange={(e)=>setDropPoint(e.detail.value || '')} value={dropPoint} type="text" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Pick Up Date Time</IonLabel>
                  <IonDatetime onIonChange={(e)=>setPickUpTime(e.detail.value || '')}  value={pickupTime} displayFormat="DD MMM hh:mm a" displayTimezone="utc"/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Car Type</IonLabel>
                  <IonInput  onIonChange={(e)=>setCarType(e.detail.value || '')} value={carType} type="text" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Expiry Time</IonLabel>
                  <IonDatetime onIonChange={(e)=>setExpiryTime(e.detail.value || '')} value={expiryTime} displayFormat="hh:mm a" displayTimezone="utc"/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Distance(in kelometers)</IonLabel>
                  <IonInput  onIonChange={(e)=>setDistance(Number(e.detail.value) || 0)} value={distance} type="number" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Customer Details</IonLabel>
                  <IonTextarea  onIonChange={(e)=>setCustomerDetail(e.detail.value || '')} value={customerDetail} autoGrow rows={2} required/>
                </IonItem>
                <IonButton className="ion-margin-top" type="submit" expand="block">
                  Add Bid
                </IonButton>
              </form>
             </div>
          </div>
        </IonPage>
    );
  }

export default AddBooking;