
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton } from '@ionic/react'
import { Link, RouteComponentProps } from 'react-router-dom';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './BookingDetails.css';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';

const BookingDetails: React.FC<RouteComponentProps> = ({history}) => {
  const openTripBookingPage = (e:any,type:string) =>{
    e.preventDefault();
    history.push(`/dashboard/tripbooking/${type}`);
  }
  return (
    <IonPage>
      <SubPageHeaderComponent/>
       <div className="booking_detail_list_scroll">
           <IonRow>
             <IonCol>
             <div className="booking_detail_box loop">
                  <IonRow>
                    <IonCol size="7">
                    <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Point - </span>
                        <span className="booking_detail_op">Dehradoon</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Drop Point - </span>
                        <span className="booking_detail_op">Delhi</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Time - </span>
                        <span className="booking_detail_op">4:00 PM</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Date  - </span>
                        <span className="booking_detail_op">29th Feb 2021</span>
                      </div>
                    </IonCol>
                    <IonCol size="5">
                      <div className="booking_title_right">
                        <span className="booking_title_op">Cab Type</span>    
                        <br/>              
                        <span className="booking_detail_op">Sadan</span>
                      </div>
                      <div className="booking_title_right">
                        <span className="booking_title_op">Booking Date & Time</span>    
                        <br/>              
                        <span className="booking_detail_op">4:00 PM 27th Dec</span>
                      </div>
                    </IonCol>
                  </IonRow>
                </div>
                <div className="booking_detail_box loop">
                  <IonRow>
                    <IonCol size="7">
                    <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Point - </span>
                        <span className="booking_detail_op">Dehradoon</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Drop Point - </span>
                        <span className="booking_detail_op">Delhi</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Time - </span>
                        <span className="booking_detail_op">4:00 PM</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Date  - </span>
                        <span className="booking_detail_op">29th Feb 2021</span>
                      </div>
                    </IonCol>
                    <IonCol size="5">
                      <div className="booking_title_right">
                        <span className="booking_title_op">Cab Type</span>    
                        <br/>              
                        <span className="booking_detail_op">Sadan</span>
                      </div>
                      <div className="booking_title_right">
                        <span className="booking_title_op">Booking Date & Time</span>    
                        <br/>              
                        <span className="booking_detail_op">4:00 PM 27th Dec</span>
                      </div>
                    </IonCol>
                  </IonRow>
                </div>
                <div className="booking_detail_box loop">
                  <IonRow>
                    <IonCol size="7">
                    <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Point - </span>
                        <span className="booking_detail_op">Dehradoon</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Drop Point - </span>
                        <span className="booking_detail_op">Delhi</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Time - </span>
                        <span className="booking_detail_op">4:00 PM</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Date  - </span>
                        <span className="booking_detail_op">29th Feb 2021</span>
                      </div>
                    </IonCol>
                    <IonCol size="5">
                      <div className="booking_title_right">
                        <span className="booking_title_op">Cab Type</span>    
                        <br/>              
                        <span className="booking_detail_op">Sadan</span>
                      </div>
                      <div className="booking_title_right">
                        <span className="booking_title_op">Booking Date & Time</span>    
                        <br/>              
                        <span className="booking_detail_op">4:00 PM 27th Dec</span>
                      </div>
                    </IonCol>
                  </IonRow>
                </div>
                <div className="booking_detail_box loop">
                  <IonRow>
                    <IonCol size="7">
                    <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Point - </span>
                        <span className="booking_detail_op">Dehradoon</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Drop Point - </span>
                        <span className="booking_detail_op">Delhi</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Time - </span>
                        <span className="booking_detail_op">4:00 PM</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Date  - </span>
                        <span className="booking_detail_op">29th Feb 2021</span>
                      </div>
                    </IonCol>
                    <IonCol size="5">
                      <div className="booking_title_right">
                        <span className="booking_title_op">Cab Type</span>    
                        <br/>              
                        <span className="booking_detail_op">Sadan</span>
                      </div>
                      <div className="booking_title_right">
                        <span className="booking_title_op">Booking Date & Time</span>    
                        <br/>              
                        <span className="booking_detail_op">4:00 PM 27th Dec</span>
                      </div>
                    </IonCol>
                  </IonRow>
                </div>
                <div className="booking_detail_box loop">
                  <IonRow>
                    <IonCol size="7">
                    <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Point - </span>
                        <span className="booking_detail_op">Dehradoon</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Drop Point - </span>
                        <span className="booking_detail_op">Delhi</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Time - </span>
                        <span className="booking_detail_op">4:00 PM</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Date  - </span>
                        <span className="booking_detail_op">29th Feb 2021</span>
                      </div>
                    </IonCol>
                    <IonCol size="5">
                      <div className="booking_title_right">
                        <span className="booking_title_op">Cab Type</span>    
                        <br/>              
                        <span className="booking_detail_op">Sadan</span>
                      </div>
                      <div className="booking_title_right">
                        <span className="booking_title_op">Booking Date & Time</span>    
                        <br/>              
                        <span className="booking_detail_op">4:00 PM 27th Dec</span>
                      </div>
                    </IonCol>
                  </IonRow>
                </div>
                <div className="booking_detail_box loop">
                  <IonRow>
                    <IonCol size="7">
                    <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Point - </span>
                        <span className="booking_detail_op">Dehradoon</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Drop Point - </span>
                        <span className="booking_detail_op">Delhi</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Time - </span>
                        <span className="booking_detail_op">4:00 PM</span>
                      </div>
                      <div className="booking_title_left">
                        <span className="booking_title_op">Pickup Date  - </span>
                        <span className="booking_detail_op">29th Feb 2021</span>
                      </div>
                    </IonCol>
                    <IonCol size="5">
                      <div className="booking_title_right">
                        <span className="booking_title_op">Cab Type</span>    
                        <br/>              
                        <span className="booking_detail_op">Sadan</span>
                      </div>
                      <div className="booking_title_right">
                        <span className="booking_title_op">Booking Date & Time</span>    
                        <br/>              
                        <span className="booking_detail_op">4:00 PM 27th Dec</span>
                      </div>
                    </IonCol>
                  </IonRow>
                </div>
              </IonCol>
           </IonRow>
       </div>
    </IonPage>
  );
};

export default BookingDetails;