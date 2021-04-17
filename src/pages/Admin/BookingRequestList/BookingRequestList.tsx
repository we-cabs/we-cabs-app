import React from 'react';
import { IonPage, IonRow,IonCol, IonButton, IonInput, IonDatetime, IonContent, IonAlert } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import './BookingRequestList.css';
import { useSelector,RootStateOrAny } from 'react-redux';
import moment from 'moment';
import AdminSubHeader from '../../../components/Admin/AdminHeader/AdminSubHeader';
import NoDataFound from '../../../components/NoDatFound/NoDataFound';
import Loader from '../../../components/Loader/Loader';


const BookingRequestList: React.FC<RouteComponentProps> = ({match,history}) => {
 
  const {bookingRequestData,loading} = useSelector((state:RootStateOrAny) => state.allBookingRequestData);

  return (
    <IonPage>
      <AdminSubHeader title={"Booking Requests"}/>
      <IonContent className="ion-padding">
           <IonRow>
             <IonCol>
             {(loading || bookingRequestData == undefined) ? <div className="graer_box_loader"><Loader/></div> : 
             <>
             {(bookingRequestData != undefined && bookingRequestData.length) ? 
             <>
             {bookingRequestData.map((data:any,i:number)=>(
               <div key={i} className="request_booking_detail_container_select loop">
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
                  
                </IonCol>
              </IonRow>
                </div> 
                </div>
              ))} 
              </>  
              : 
              <div className="no_data_found">
                <NoDataFound/>
              </div>
              }  
              </>  
                   
             }      
              </IonCol>
           </IonRow>
           
       </IonContent>
    </IonPage>
  );
};

export default BookingRequestList;