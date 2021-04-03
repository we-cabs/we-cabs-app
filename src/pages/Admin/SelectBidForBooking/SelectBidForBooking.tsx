import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import './SelectBidForBooking.css';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import moment from 'moment';

interface SelectBidForBookingProps extends RouteComponentProps<{
  type: string;
}> {}

const SelectBidForBooking: React.FC<SelectBidForBookingProps> = ({match,history}) => {

  const dispatch = useDispatch();
  const {booking,loading} = useSelector((state:RootStateOrAny) => state.bookingDetails);
  return (
    <IonPage>
      <AdminSubHeader title={"Bookings"}/>
      <IonContent fullscreen className="ion-padding">
           <IonRow>
             <IonCol>
             {(loading || booking == undefined) ? 'Loading' : 
             <>
             {booking.map((data:any,i:number)=>(
              <div key={i} className="booking_detail_container loop">
              <div className="booking_detail_box">
              <IonRow>
              <IonCol size="5">
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
                </IonCol>
                <IonCol>
                <div className="booking_title_left">
                    <span className="booking_detail_op">{data.pickupPoint}</span>
                    <div className="bidding_list_q_button">Bidding List {'>'}</div>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_detail_op">{data.dropPoint}</span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_detail_op">{data.carType}</span>
                  </div>
                  <div className="booking_title_left">
                    <span className="booking_detail_op">{moment(new Date(data.pickupTime)).utc().format("DD MMM")}</span>
                  </div>
                </IonCol>
              </IonRow>
            </div> 
            </div>
              ))}   
              </>  
             }      
              </IonCol>
           </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default SelectBidForBooking;