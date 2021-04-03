import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import './SelectBidForBooking.css';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';

interface SelectBidForBookingProps extends RouteComponentProps<{
  type: string;
}> {}

const SelectBidForBooking: React.FC<SelectBidForBookingProps> = ({match,history}) => {

  const dispatch = useDispatch();
  const {booking,loading} = useSelector((state:RootStateOrAny) => state.bookingDetails);
  return (
    <IonPage>
      <AdminSubHeader title={"Bookings"}/>
      <IonContent>
           <IonRow>
             <IonCol>
             {(loading || booking == undefined) ? 'Loading' : 
             <>
             {booking.map((data:any,i:number)=>(
               <div className="booking_detail_container">
                  <div key={i} className="booking_detail_box loop">
                  <IonRow>
                    <IonCol size="7">
                    <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Point - </span>
                        <span className="booking_detail_op">{data.pickup_point}</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Drop Point - </span>
                        <span className="booking_detail_op">{data.drop_point}</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Time - </span>
                        <span className="booking_detail_op">{data.pickup_time}</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Date  - </span>
                        <span className="booking_detail_op">{data.pickup_date}</span>
                      </div>
                    </IonCol>
                    <IonCol size="5">
                      <div className="booking_title_right">
                        <span className="booking_title_op">Cab Type</span>    
                        <br/>              
                        <span className="booking_detail_op">{data.cab_type}</span>
                      </div>
                      <div className="booking_title_right">
                        <span className="booking_title_op">Booking Date & Time</span>    
                        <br/>              
                        <span className="booking_detail_op">{data.booking_date_time}</span>
                      </div>
                      <div className="bidding_list_button">Bidding List {'>'}</div>
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