
import React,{useEffect,useState} from 'react';
import { IonPage, IonRow,IonCol, IonButton, IonInput, IonDatetime, IonContent } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import './Notification.css';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import Select from 'react-select';
import { _convertUnixToDateTimeFormat } from '../../hooks/DateTimeConverter';
import { addBiddingBookingData } from '../../actions/BiddingAction';
import Loader from '../../components/Loader/Loader';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import NoDataFound from '../../components/NoDatFound/NoDataFound';

interface NotificationProps extends RouteComponentProps<{
  type: string;
}> {}


const Notification: React.FC<NotificationProps> = ({match,history}) => {
  const dispatch = useDispatch();

  const {booking,loading} = useSelector((state:RootStateOrAny) => state.bookingDetails);
 
  const openBiddingPage = (e:any,data:any) =>{
    e.preventDefault();
    dispatch(addBiddingBookingData(data));
    history.push(`/tabs/dashboard/bidding`);
  }

  const hrederTitle = () =>{
    return 'Notification';
  }

  return (
    <IonPage>
      <SubPageHeaderComponent title={hrederTitle()}/>
      <IonContent fullscreen className="hide_overflow">
      <IonRow>
          <IonCol className="notification_top_tab active">
             <div>
                Type
             </div>
          </IonCol>
          <IonCol className="notification_top_tab">
                Info
          </IonCol>
        </IonRow>
        <div className="notification_detail_list_scroll">
           <IonRow>
             <IonCol>
             {(loading || booking == undefined) ? <div className="graer_box_loader"><Loader/></div> : 
             <>
             {(booking != undefined && booking.length) ? 
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
                        <span onClick={(e)=>openBiddingPage(e,data)} className="bidding_list_button">Bid Now</span>
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
              : 
                  <div className="no_car_data_found_div_section">
                       <NoDataFound/>
                  </div>
              }  
              </>  
                   
             }      
              </IonCol>
           </IonRow>
              </div>
       </IonContent>
    </IonPage>
  );
};

export default Notification;