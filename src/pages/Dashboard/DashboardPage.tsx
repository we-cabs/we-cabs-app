import React,{useEffect,useState} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton, IonToast } from '@ionic/react'
import { Link, RouteComponentProps,useParams } from 'react-router-dom';
import { useDispatch,useSelector,RootStateOrAny} from 'react-redux';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './DashboardPage.css';
import VideoAndLogoFooter from '../../components/Footers/VideoAndLogoFooter';
import { actionToGetUserCar, actionToGetUserDeviceToken,actionToGetUserDataById } from '../../actions/UserAction';
import { actionToGetBidByUserId } from '../../actions/BiddingAction';
import { actionToGetBookingData } from '../../actions/BookingAction';

const DashboardPage: React.FC<RouteComponentProps> = ({history}) => {
  const dispatch = useDispatch();
  const params:any = useParams();

  const [showToast, setShowToast] = useState(false);
  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);


  const openBookingDetailPage = (e:any) =>{
    e.preventDefault();
    dispatch(actionToGetBookingData(0));
    history.push(`/tabs/dashboard/bookingdetail`);
  }

  const openGoldBookingDetailPage = (e:any) =>{
    e.preventDefault();
    if(userInfo.role == 'goldDriaver'){
      dispatch(actionToGetBookingData(0));
      history.push(`/tabs/dashboard/gold-booking-list-page`);
    }else{
      setShowToast(true);
    }
  }


  const callActionToSendPushNotification = () =>{
    dispatch(actionToGetUserDeviceToken(history));
  }

  useEffect(()=>{
    dispatch(actionToGetBookingData(1));
    dispatch(actionToGetUserDataById(userInfo.phone)); 
    dispatch(actionToGetUserCar(userInfo.phone));
    dispatch(actionToGetBidByUserId(userInfo.phone));
    callActionToSendPushNotification();
  },[])
  
  return (
    <IonPage>
      <HeaderComponent title="Home"/>
      <IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="You are not gold member yet"
        duration={1300}
      />
        <div className="inner_contant_container">
        <div className="extra_red_section_div"></div>
        <div className="trip_button_container">
          <IonRow>
            <IonCol>
              <button onClick={(e) => openGoldBookingDetailPage(e)} className="trip_button">
                <IonRow>
                    <IonCol size="4" className="trip_button_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145.46 149.72"><g fill="#fff" strokeLinejoin="round" strokeWidth="6" stroke="#3f3f3f"><path d="M108.82 98.37H49.9l-31.63 24.39V98.37H8.88A5.89 5.89 0 0 1 3 92.48V8.88A5.88 5.88 0 0 1 8.88 3h99.94a5.89 5.89 0 0 1 5.89 5.88v83.6a5.89 5.89 0 0 1-5.89 5.89z"/><path d="M74.65 127.71h25.8l27.59 19v-19h8.54a5.88 5.88 0 0 0 5.88-5.88V72.9a5.88 5.88 0 0 0-5.88-5.9H74.65a5.89 5.89 0 0 0-5.88 5.88v48.93a5.88 5.88 0 0 0 5.88 5.9z"/></g><g fill="none" strokeWidth="3"><path d="M33.74,28.19a5,5,0,0,1-.86-1.84A8.87,8.87,0,0,1,32.55,24a4.56,4.56,0,0,1,1-3.3,3.6,3.6,0,0,1,2.65-1H80.75a7.19,7.19,0,0,1,.81,1.84,7.49,7.49,0,0,1,.38,2.26,4.52,4.52,0,0,1-1.08,3.46,3.75,3.75,0,0,1-2.6,1Zm0,18.15a3.88,3.88,0,0,1-.86-1.68,8.23,8.23,0,0,1-.33-2.32,4.52,4.52,0,0,1,1-3.29,3.56,3.56,0,0,1,2.65-1H80.75a11,11,0,0,1,.81,1.83,6.93,6.93,0,0,1,.38,2.27,4.2,4.2,0,0,1-1.08,3.19,3.62,3.62,0,0,1-2.6,1H70.38a22.19,22.19,0,0,1-1.52,7A17,17,0,0,1,65,59.14a18.71,18.71,0,0,1-6.27,4.06A27.5,27.5,0,0,1,50.17,65l20.21,15a7.91,7.91,0,0,1-1.68,5,5.42,5.42,0,0,1-4.38,1.84,6.89,6.89,0,0,1-3.51-1A23.76,23.76,0,0,1,57,83L37,64.71a5.91,5.91,0,0,1-.32-1.19,8.74,8.74,0,0,1-.11-1.4,5.08,5.08,0,0,1,2.27-4.33h6.27c4.39,0,7.82-1,10.26-3.13a11.06,11.06,0,0,0,3.9-8.32Z" stroke="#3f3f3f"/><path d="M106.52 81.62l4.7 9.53 10.51 1.53a1 1 0 0 1 .55 1.7l-7.6 7.42 1.79 10.46a1 1 0 0 1-1.45 1.06l-9.4-4.94-9.4 4.94a1 1 0 0 1-1.45-1.06l1.79-10.46L89 94.38a1 1 0 0 1 .55-1.7L100 91.15l4.7-9.53a1 1 0 0 1 1.82 0z" stroke="#3f3f3f" strokeMiterlimit="10"/></g></svg>
                    </IonCol>
                    <IonCol size="8" className="trip_button_text">
                      We Cabs Gold
                    </IonCol>
                </IonRow>
              </button>
            </IonCol>
          </IonRow>
          <IonRow>     
            <IonCol>
              <button onClick={(e) => openBookingDetailPage(e)} className="trip_button">
                <IonRow>
                    <IonCol size="4" className="trip_button_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145.46 149.72"><g fill="#fff" strokeLinejoin="round" strokeWidth="6" stroke="#3f3f3f"><path d="M108.82 98.37H49.9l-31.63 24.39V98.37H8.88A5.89 5.89 0 0 1 3 92.48V8.88A5.88 5.88 0 0 1 8.88 3h99.94a5.89 5.89 0 0 1 5.89 5.88v83.6a5.89 5.89 0 0 1-5.89 5.89z"/><path d="M74.65 127.71h25.8l27.59 19v-19h8.54a5.88 5.88 0 0 0 5.88-5.88V72.9a5.88 5.88 0 0 0-5.88-5.9H74.65a5.89 5.89 0 0 0-5.88 5.88v48.93a5.88 5.88 0 0 0 5.88 5.9z"/></g><g fill="none" strokeWidth="3"><path d="M105.62 107.12a4 4 0 0 1-4-4V92.85l-5.72 6.77a4 4 0 1 1-6.11-5.17l12.77-15.11.15-.15.22-.21a.5.5 0 0 1 .11-.12l.13-.09h0l.09-.07.28-.19.23-.14.15-.06.33-.14.24-.09h.18L105 78h.26.2.18.2.16.21l.34.06h.2l.2.07.34.14.17.08a.78.78 0 0 1 .18.11l.33.21.23.18a.92.92 0 0 1 .14.14 2 2 0 0 1 .21.21l.12.11 12.77 15.11a4 4 0 0 1-6.11 5.17l-5.72-6.77v10.27a4 4 0 0 1-3.99 4.03z" stroke="#3f3f3f" strokeMiterlimit="10"/><circle cx="105.62" cy="116.23" r="4.17" stroke="#3f3f3f"/><path d="M33.74,28.19a5,5,0,0,1-.86-1.84A8.87,8.87,0,0,1,32.55,24a4.56,4.56,0,0,1,1-3.3,3.6,3.6,0,0,1,2.65-1H80.75a7.19,7.19,0,0,1,.81,1.84,7.49,7.49,0,0,1,.38,2.26,4.52,4.52,0,0,1-1.08,3.46,3.75,3.75,0,0,1-2.6,1Zm0,18.15a3.88,3.88,0,0,1-.86-1.68,8.23,8.23,0,0,1-.33-2.32,4.52,4.52,0,0,1,1-3.29,3.56,3.56,0,0,1,2.65-1H80.75a11,11,0,0,1,.81,1.83,6.93,6.93,0,0,1,.38,2.27,4.2,4.2,0,0,1-1.08,3.19,3.62,3.62,0,0,1-2.6,1H70.38a22.19,22.19,0,0,1-1.52,7A17,17,0,0,1,65,59.14a18.71,18.71,0,0,1-6.27,4.06A27.5,27.5,0,0,1,50.17,65l20.21,15a7.91,7.91,0,0,1-1.68,5,5.42,5.42,0,0,1-4.38,1.84,6.89,6.89,0,0,1-3.51-1A23.76,23.76,0,0,1,57,83L37,64.71a5.91,5.91,0,0,1-.32-1.19,8.74,8.74,0,0,1-.11-1.4,5.08,5.08,0,0,1,2.27-4.33h6.27c4.39,0,7.82-1,10.26-3.13a11.06,11.06,0,0,0,3.9-8.32Z" stroke="#3f3f3f"/></g></svg>
                   </IonCol>
                    <IonCol size="8" className="trip_button_text">
                      We Cabs Buzz
                    </IonCol>
                </IonRow>
              </button>
            </IonCol>
          </IonRow>
        </div>
   
         <VideoAndLogoFooter/>
        
        </div>
        </IonContent>
    </IonPage>
  );
};

export default DashboardPage;