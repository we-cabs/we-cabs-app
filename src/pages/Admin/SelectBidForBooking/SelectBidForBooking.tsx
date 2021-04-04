import React,{useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton, IonAlert } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import './SelectBidForBooking.css';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import moment from 'moment';
import { actionToGetBidingDataByBooking, actionToUpdateBooking } from '../../../actions/BookingAction';
import Loader from '../../../components/Loader/Loader';
import { cloneDeep } from 'lodash';

interface SelectBidForBookingProps extends RouteComponentProps<{
  type: string;
}> {}

const SelectBidForBooking: React.FC<SelectBidForBookingProps> = ({match,history}) => {

  const dispatch = useDispatch();
  const {booking,loading} = useSelector((state:RootStateOrAny) => state.bookingDetails);
  const [showAlert,setShowAlert] = useState(false);
  const [actionBooking,setActionBookingId] = useState('');

  const callActionToCancelBooking = (bookingId:any) =>{
    setShowAlert(false);
    let payload:any = cloneDeep(actionBooking);
    payload.status = 'cancel';
    dispatch(actionToUpdateBooking(payload));
  }

  const callActionToGetBidingDataByBooking = (bookingData:any) =>{
    dispatch(actionToGetBidingDataByBooking(bookingData));
    history.push(`/tabs/dashboard/booking-bids/${JSON.stringify(bookingData)}`);
  }

  return (
    <IonPage>
      <AdminSubHeader title={"Bookings"}/>
      <IonContent fullscreen className="ion-padding">
           <IonRow>
             <IonCol>
             {(loading || booking == undefined) ? <Loader/> : 
             <>
             {booking.map((data:any,i:number)=>(
               <>
               {(data.status != "cancel") ? 
              <div key={i} className="booking_detail_container_select loop">
              <div className="booking_detail_box">
              <IonRow>
              <IonCol size="6">
                <div className="booking_title_left">
                    <span className="booking_title_op">Pickup: </span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_title_op">Drop: </span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_title_op">Cab Type: </span>                   
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_title_op">Date & Time:</span>
                  </div>
                  <div className="booking_title_left">
                    <div onClick={()=>{setActionBookingId(data); setShowAlert(true)}} className="bidding_list_cancel_button">Cancle Booking {'>'}</div>
                  </div>
                </IonCol>
                <IonCol>
                <div className="booking_title_left">
                    <span className="booking_detail_op">{data.pickupPoint}</span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_detail_op">{data.dropPoint}</span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_detail_op">{data.carType}</span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_detail_op">{moment(new Date(data.pickupTime)).utc().format("DD MMM YYYY")}</span>
                  </div>
                  <div className="booking_title_left">
                    <div onClick={()=>callActionToGetBidingDataByBooking(data)} className="bidding_list_q_button">Bidding List {'>'}</div>
                  </div>
                </IonCol>
              </IonRow>
            </div> 
            </div>
            :''}
            </>
              ))}   
              </>  
             }      
              </IonCol>
           </IonRow>
           <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass='my-custom-class'
            header={'Are you sure?'}
            message={'You want to cancel this booking.'}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: blah => {
              
                }
              },
              {
                text: 'Okay',
                handler: () => {
                  callActionToCancelBooking(actionBooking);
                }
              }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default SelectBidForBooking;