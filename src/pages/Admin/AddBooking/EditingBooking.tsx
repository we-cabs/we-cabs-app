import { IonPage,IonRow,IonCol,IonItem,IonLabel,IonInput,IonButton, IonTextarea, IonDatetime, IonAlert, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
import React,{useState} from 'react';
import { useSelector,RootStateOrAny } from 'react-redux';
import './AddBooking.css';
import AdminHeaderComponent from '../../../components/Admin/AdminHeader/AdminHeaderComponent';
import { RouteComponentProps } from 'react-router';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import { useDispatch } from 'react-redux';
import { addBookingData } from '../../../actions/BookingAction';
import moment from 'moment';
import $ from 'jquery';

const EditingBooking: React.FC<RouteComponentProps> = ({match, history}) => {
  const dispatch = useDispatch();
  const editBookingData = useSelector((state:RootStateOrAny) => state.editBookingData);

  const [pickupPoint, setPickUpPoint] = useState<string>(editBookingData.pickupPoint);
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  const [maxAmount, setMaxAmount] = useState<number>(editBookingData.basePrice);
  const [dropPoint, setDropPoint] = useState<string>(editBookingData.dropPoint);
  const [pickupTime, setPickUpTime] = useState<string>(moment(editBookingData.pickupTime).format('DD MMM hh:mm a'));
  const [carType, setCarType] = useState<string>((editBookingData.carType));
  const [tripType, setTripType] = useState<string>(editBookingData.tripType);
  const [distance, setDistance] = useState<number>(editBookingData.distance);
  const [reviewCollected, setReviewCollected] = useState<number>(editBookingData.reviewCollected);
  const [expiryTime, setExpiryTime] = useState<string>(moment(editBookingData.expiryTime).format('DD MMM hh:mm a'));
  const [customerDetail, setCustomerDetail] = useState<string>(editBookingData.customerDetails.detail);
  const [tripNote, setTripNote] = useState<string>(editBookingData.notes);
  const [companyReceivableAmount, setCompanyReceivableAmount] = useState<number>(editBookingData.companyReceivableAmount);
  const [bookingType, setBookingType] = useState<string>(editBookingData.bookingType);

  const cabType = useSelector((state:RootStateOrAny) => state.cabType);
  const formSubmitHandler =(e:any)=>{
    e.preventDefault();
    const bookingData = {
      bookingId:editBookingData.bookingId,
      pickupPoint,
      dropPoint,
      pickupTime:moment(pickupTime).valueOf(),
      carType,
      allottedBidId:editBookingData.allottedBidId,
      allottedUserId:editBookingData.allottedUserId,
      distance,
      expiryTime:moment(expiryTime).valueOf(),
      customerDetails:{detail:customerDetail},
      notes:tripNote,
      basePrice:maxAmount,
      bookingType:bookingType,
      maxAmount:maxAmount,
      maxPrice:maxAmount,
      status:editBookingData.status,
      tripType,
      reviewCollected:Number(reviewCollected),
      companyReceivableAmount:Number(companyReceivableAmount)
    }
    dispatch(addBookingData(bookingData));
    setOnSubmit(true);
  }
    return (
        <IonPage>
         <AdminSubHeader title={"Edit Booking"}/>
         <IonContent>
             <div className="add_bidding_inner_coontainer">
             <form id={"add_booking_form"} className="ion-padding" onSubmit={(e)=>formSubmitHandler(e)}>
             <IonAlert
                isOpen={onSubmit}
                onDidDismiss={() => {history.goBack(); setOnSubmit(false)}}
                cssClass="my-custom-class"
                header={"Success!"}
                message={"Booking Successfully Updated."}
                buttons={["Close"]}/>
                 <IonItem>
                  <IonLabel position="floating">Amount To Receive</IonLabel>
                  <IonInput onIonChange={(e)=>setCompanyReceivableAmount(Number(e.detail.value) || 0)} value={companyReceivableAmount} type="number" required/>
                </IonItem>
                <IonItem>
                   <IonLabel position="floating">Rating</IonLabel>
                   <IonSelect value={reviewCollected} onIonChange={(e)=>setReviewCollected(e.detail.value)}>
                    <IonSelectOption value="1">1 Star</IonSelectOption>
                    <IonSelectOption value="2">2 Star</IonSelectOption>
                    <IonSelectOption value="3">3 Star</IonSelectOption>
                    <IonSelectOption value="4">4 Star</IonSelectOption>
                    <IonSelectOption value="5">5 Star</IonSelectOption>
                  </IonSelect>
                </IonItem>
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
                  <IonDatetime onIonChange={(e)=>setPickUpTime(e.detail.value || '')}  value={pickupTime} displayFormat="DD MMM hh:mm a"  displayTimezone="utc"/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Car Type</IonLabel>
                  {(cabType != undefined && cabType.length) ? 
                     <IonSelect value={carType} onIonChange={(e)=>setCarType(e.detail.value)}>
                       {cabType.map((car:any,key:number)=>(
                          <IonSelectOption key={key}>{car}</IonSelectOption>
                       ))}
                     </IonSelect>
                     :''
                  }
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Booking Type</IonLabel>
                  <IonSelect value={bookingType} onIonChange={(e)=>setBookingType(e.detail.value)}>
                    <IonSelectOption value="buzz">Buzz</IonSelectOption>
                    <IonSelectOption value="gold">Gold</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Bid Expiry Time</IonLabel>
                  <IonDatetime onIonChange={(e)=>setExpiryTime(e.detail.value || '')} value={expiryTime} displayFormat="DD MMM hh:mm a" displayTimezone="utc"/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Distance(in kelometers)</IonLabel>
                  <IonInput  onIonChange={(e)=>setDistance(Number(e.detail.value) || 0)} value={distance} type="number" required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Max Price</IonLabel>
                  <IonInput  onIonChange={(e)=>setMaxAmount(Number(e.detail.value) || 0)} value={maxAmount} type="number" required/>
                </IonItem>
                <IonItem>
                <IonLabel position="floating">Trip Type</IonLabel>
                  <IonSelect value={tripType} onIonChange={(e)=>setTripType(e.detail.value)}>
                    <IonSelectOption value="oneway">One Way</IonSelectOption>
                    <IonSelectOption value="round">Round Trip</IonSelectOption>
                  </IonSelect>
                </IonItem>
               
                <IonItem>
                  <IonLabel position="floating">Trip Notes</IonLabel>
                  <IonTextarea  onIonChange={(e)=>setTripNote(e.detail.value || '')} value={tripNote} autoGrow rows={2} required/>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Customer Details</IonLabel>
                  <IonTextarea  onIonChange={(e)=>setCustomerDetail(e.detail.value || '')} value={customerDetail} autoGrow rows={2} required/>
                </IonItem>
                <IonButton className="ion-margin-top" type="submit" expand="block">
                  Update Booking
                </IonButton>
              </form>
             </div>
       </IonContent>
        </IonPage>
    );
  }

export default EditingBooking;