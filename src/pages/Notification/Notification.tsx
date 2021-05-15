
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
  const [notificationTab,setNotificationTab] = useState('type');
 
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
          <IonCol onClick={()=>setNotificationTab('type')} 
                 className={"notification_top_tab "+(notificationTab == 'type' ? 'active' : '')}>
             <div>
                Type
             </div>
          </IonCol>
          <IonCol onClick={()=>setNotificationTab('info')} 
                  className={"notification_top_tab "+(notificationTab == 'info' ? 'active' : '')}>
                Info
          </IonCol>
        </IonRow>
        <div className="notification_detail_list_scroll">
          {(notificationTab == 'type') ? 
          <>
           <IonRow>
             <IonCol>
             {(loading || booking == undefined) ? <div className="graer_box_loader"><Loader/></div> : 
             <>
             {(booking != undefined && booking.length) ? 
             <>
             {booking.map((data:any,i:number)=>(
               <div key={i} className="notification_detail_container_loop">
                  <div className="">
                  <IonRow>
                    <IonCol size="2">
                       <div className="notification_booking_sudo_profile_div">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11 0 512 512"><path d="M298.668 426.668c0 47.129-38.207 85.332-85.336 85.332S128 473.797 128 426.668s38.203-85.336 85.332-85.336 85.336 38.207 85.336 85.336zm0 0" fill="#ffa000"/><path d="M362.836 254.316c-72.32-10.328-128.168-72.516-128.168-147.648 0-21.336 4.563-41.578 12.648-59.949-10.922-2.559-22.27-4.051-33.984-4.051C130.988 42.668 64 109.652 64 192v59.477c0 42.219-18.496 82.07-50.945 109.504C4.758 368.062 0 378.41 0 389.332c0 20.59 16.746 37.336 37.332 37.336h352c20.59 0 37.336-16.746 37.336-37.336 0-10.922-4.758-21.27-13.27-28.543-31.488-26.645-49.75-65.324-50.562-106.473zm0 0" fill="#ffc107"/><path d="M490.668 106.668c0 58.91-47.758 106.664-106.668 106.664s-106.668-47.754-106.668-106.664S325.09 0 384 0s106.668 47.758 106.668 106.668zm0 0" fill="#f44336"/></svg>
                       </div>
                    </IonCol>
                    <IonCol size="4">
                      <div className="booking_title_left">
                        <span className="notification_booking_detail_title">Pickup Point</span>
                        <br/>
                        <span className="notification_booking_detail_op">{data.pickupPoint}</span>
                      </div>
                    </IonCol>
                    <IonCol size="6">
                      <div className="notification_booking_title_left">
                        <span className="notification_booking_date">{_convertUnixToDateTimeFormat(data.pickupTime,'DD MMM - hh:mm A')}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.846 451.847"><path d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284a31.53 31.53 0 0 1 9.262 22.366c0 8.099-3.091 16.196-9.267 22.373z"></path></svg>
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
           </>
           : (notificationTab == 'info') ?         
             <>
              <IonRow className="notification_list_info_section_row success">
                  <IonCol size="2">
                    <div className="info_svg_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.707 19.121c-.187.188-.442.293-.707.293s-.52-.105-.707-.293l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"/></svg>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                     Bidding succes
                  </IonCol>
                  <IonCol size="6">
                     Dehradun 25 Mar - 10:00 PM
                  </IonCol>
              </IonRow>
              <IonRow className="notification_list_info_section_row success">
                  <IonCol size="2">
                    <div className="info_svg_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.707 19.121c-.187.188-.442.293-.707.293s-.52-.105-.707-.293l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"/></svg>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                     Bidding succes
                  </IonCol>
                  <IonCol size="6">
                     Dehradun 25 Mar - 10:00 PM
                  </IonCol>
              </IonRow>
              <IonRow className="notification_list_info_section_row success">
                  <IonCol size="2">
                    <div className="info_svg_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.707 19.121c-.187.188-.442.293-.707.293s-.52-.105-.707-.293l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"/></svg>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                     Bidding succes
                  </IonCol>
                  <IonCol size="6">
                     Dehradun 25 Mar - 10:00 PM
                  </IonCol>
              </IonRow>
              <IonRow className="notification_list_info_section_row success">
                  <IonCol size="2">
                    <div className="info_svg_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.707 19.121c-.187.188-.442.293-.707.293s-.52-.105-.707-.293l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"/></svg>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                     Bidding succes
                  </IonCol>
                  <IonCol size="6">
                     Dehradun 25 Mar - 10:00 PM
                  </IonCol>
              </IonRow>
              <IonRow className="notification_list_info_section_row success">
                  <IonCol size="2">
                    <div className="info_svg_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.707 19.121c-.187.188-.442.293-.707.293s-.52-.105-.707-.293l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"/></svg>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                     Bidding succes
                  </IonCol>
                  <IonCol size="6">
                     Dehradun 25 Mar - 10:00 PM
                  </IonCol>
              </IonRow>
              <IonRow className="notification_list_info_section_row success">
                  <IonCol size="2">
                    <div className="info_svg_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.707 19.121c-.187.188-.442.293-.707.293s-.52-.105-.707-.293l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"/></svg>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                     Bidding succes
                  </IonCol> 
                  <IonCol size="6">
                     Dehradun 25 Mar - 10:00 PM 
                  </IonCol>
              </IonRow>
              <IonRow className="notification_list_info_section_row success">
                  <IonCol size="2">
                    <div className="info_svg_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.707 19.121c-.187.188-.442.293-.707.293s-.52-.105-.707-.293l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"/></svg>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                     Bidding succes
                  </IonCol>
                  <IonCol size="6">
                     Dehradun 25 Mar - 10:00 PM
                  </IonCol>
              </IonRow>
             </>
           : ''}
              </div>
       </IonContent>
    </IonPage>
  );
};

export default Notification;