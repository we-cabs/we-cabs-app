
import React,{useEffect,useState} from 'react';
import { IonPage, IonRow,IonCol, IonButton, IonInput, IonDatetime, IonContent } from '@ionic/react'
import { RouteComponentProps } from 'react-router-dom';
import './Notification.css';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import Select from 'react-select';
import { _convertUnixToDateTimeFormat } from '../../hooks/DateTimeConverter';
import { addBiddingBookingData,actionToUpdateUserNotificationData } from '../../actions/BiddingAction';
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
  const userInfo = useSelector((state:RootStateOrAny) => state.userSignin.userInfo);
  const [notificationTab,setNotificationTab] = useState('type');
 
  const openBiddingPage = (e:any,data:any,key:any) =>{
    e.preventDefault();
    dispatch(addBiddingBookingData(data));
    dispatch(actionToUpdateUserNotificationData({data:userInfo.notifications,key:key}));
    history.push(`/tabs/dashboard/bidding`);
  }

  const hrederTitle = () =>{
    return 'Notification';
  }

  const getNotificationData = () =>{
    let content:any = [];
    if(Object.keys(userInfo.notifications) && Object.keys(userInfo.notifications).length){
    Object.keys(userInfo.notifications).map((key:any,i:number)=>{
      let notification = userInfo.notifications[key];
     if(notification.details != undefined && notification.details.pickupPoint != undefined) {
      content.push(<div key={i} className="notification_detail_container_loop">
         <div onClick={(e)=>openBiddingPage(e,notification.details,key)} className="">
         <IonRow>
           <IonCol size="2">
              <div className="notification_booking_sudo_profile_div">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11 0 512 512"><path d="M298.668 426.668c0 47.129-38.207 85.332-85.336 85.332S128 473.797 128 426.668s38.203-85.336 85.332-85.336 85.336 38.207 85.336 85.336zm0 0" fill="#ffa000"/><path d="M362.836 254.316c-72.32-10.328-128.168-72.516-128.168-147.648 0-21.336 4.563-41.578 12.648-59.949-10.922-2.559-22.27-4.051-33.984-4.051C130.988 42.668 64 109.652 64 192v59.477c0 42.219-18.496 82.07-50.945 109.504C4.758 368.062 0 378.41 0 389.332c0 20.59 16.746 37.336 37.332 37.336h352c20.59 0 37.336-16.746 37.336-37.336 0-10.922-4.758-21.27-13.27-28.543-31.488-26.645-49.75-65.324-50.562-106.473zm0 0" fill="#ffc107"/><path d="M490.668 106.668c0 58.91-47.758 106.664-106.668 106.664s-106.668-47.754-106.668-106.664S325.09 0 384 0s106.668 47.758 106.668 106.668zm0 0" fill="#f44336"/></svg>
              </div>
           </IonCol>
           <IonCol size="4">
             <div className="notification_booking_title_right">
               <span className="notification_booking_detail_title">Pickup Point</span>
               <br/>
               <span className="notification_booking_detail_op">{notification.details.pickupPoint}</span>
             </div>
           </IonCol>
           <IonCol size="6">
             <div className="notification_booking_title_left">
               <span className="notification_booking_date">{_convertUnixToDateTimeFormat(notification.details.pickupTime,'DD MMM - hh:mm A')}</span>
               </div>
           </IonCol>
         </IonRow>
       </div> 
       </div>)
      }
    })
  }
     return content;
  }

  return (
    <IonPage>
      <SubPageHeaderComponent title={hrederTitle()}/>
      <IonContent fullscreen className="hide_overflow">
      {/* <IonRow>
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
        </IonRow> */}
        <div className="notification_detail_list_scroll">
        <IonRow>
             <IonCol>
             
             {(userInfo.notifications != undefined && Object.keys(userInfo.notifications).length) ? 
             <>
             {getNotificationData()}
              </>  
              : 
                <div className="no_car_data_found_div_section">
                    <NoDataFound/>
                </div>
              }  
                 
              </IonCol>
           </IonRow>
        </div>
       </IonContent>
    </IonPage>
  );
};

export default Notification;