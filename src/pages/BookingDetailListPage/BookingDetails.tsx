
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton } from '@ionic/react'
import { Link, RouteComponentProps } from 'react-router-dom';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './BookingDetails.css';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';

const BookingDetails: React.FC<RouteComponentProps> = ({history}) => {
  const openTripBookingPage = (e:any,type:string) =>{
    e.preventDefault();
    history.push(`/dashboard/tripbooking/${type}`);
  }
  const {booking,loading} = useSelector((state:RootStateOrAny) => state.bookingDetails);
  return (
    <IonPage>
      <SubPageHeaderComponent/>
       <div className="booking_detail_list_scroll">
           <IonRow>
             <IonCol>
             {(loading || booking == undefined) ? 'Loading' : 
             <>
             {booking.map((data:any,i:number)=>(
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
                    </IonCol>
                  </IonRow>
                  <IonButton className="book_or_bid_button">BID NOW or BOOK TO BID</IonButton>
                </div> 
              ))}   
              </>  
             }      
              </IonCol>
           </IonRow>
       </div>
    </IonPage>
  );
};

export default BookingDetails;