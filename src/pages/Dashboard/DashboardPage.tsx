import React,{useEffect} from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow,IonCol, IonButton } from '@ionic/react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch,useSelector,RootStateOrAny} from 'react-redux';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './DashboardPage.css';
import VideoAndLogoFooter from '../../components/Footers/VideoAndLogoFooter';
import { actionToGetBookingData } from '../../actions/BookingAction';
import { actionToGetUserCar } from '../../actions/UserAction';
import { actionToGetBidByUserId } from '../../actions/BiddingAction';

const DashboardPage: React.FC<RouteComponentProps> = ({history}) => {
  const dispatch = useDispatch();
  const openTripBookingPage = (e:any,type:string) =>{
    e.preventDefault();
    history.push(`/tabs/dashboard/tripbooking/${type}`);
  }
  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);

  useEffect(()=>{
    dispatch(actionToGetBookingData());
    dispatch(actionToGetUserCar(userInfo.phone));
    dispatch(actionToGetBidByUserId(userInfo.phone));
  },[])
  
  return (
    <IonPage>
      <HeaderComponent title="Home"/>
      <IonContent>
        <div className="inner_contant_container">
        <div className="extra_red_section_div"></div>
        <div className="trip_button_container">
          <IonRow>
            <IonCol>
              <button onClick={(e) => openTripBookingPage(e,'oneway')} className="trip_button">
                <IonRow>
                    <IonCol size="4" className="trip_button_icon">
                      <svg  viewBox="0 0 865.19 862.1"><path d="M847.56 283.39l-100-149a103.25 103.25 0 0 0-85.83-45.78h-212.9V12.85A12.85 12.85 0 0 0 435.98 0H324.32a12.85 12.85 0 0 0-9.086 3.764 12.85 12.85 0 0 0-3.764 9.086h0v75.7h-182.4c-7.097 0-12.85 5.753-12.85 12.85s5.753 12.85 12.85 12.85H661.7a77.57 77.57 0 0 1 64.51 34.39l100 149c17.669 26.159 17.669 60.431 0 86.59l-100 149a77.56 77.56 0 0 1-64.51 34.4H103.39c-42.891-.039-77.651-34.799-77.69-77.69V191.96c.1-34.46 22.8-64.77 55.84-74.56 6.759-2.031 10.615-9.132 8.638-15.907A12.85 12.85 0 0 0 74.34 92.73C30.373 105.771.16 146.1 0 191.96v298.07c.055 57.049 46.271 103.292 103.32 103.38h208.13v255.84a12.85 12.85 0 0 0 12.85 12.85h111.62a12.84 12.84 0 0 0 12.84-12.85v-52.79a12.85 12.85 0 1 0-25.69 0v39.84h-85.92V593.41h85.92v151.66a12.85 12.85 0 1 0 25.69 0V593.41h212.88a103.23 103.23 0 0 0 85.86-45.61l100-149c23.52-34.809 23.52-80.421 0-115.23zM337.18 25.7h85.92v62.85h-85.92zM596.1 314.8a12.85 12.85 0 1 0 0-25.69H302.22a12.85 12.85 0 1 0 0 25.69zm-448.09 0h102.68a12.85 12.85 0 1 0 0-25.69H148.01a12.85 12.85 0 1 0 0 25.69zm0 78.12h448a12.85 12.85 0 0 0 0-25.7h-448a12.85 12.85 0 0 0 0 25.7z"/></svg>
                    </IonCol>
                    <IonCol size="8" className="trip_button_text">
                      One way
                    </IonCol>
                </IonRow>
              </button>
            </IonCol>
          </IonRow>
          <IonRow>     
            <IonCol>
              <button onClick={(e) => openTripBookingPage(e,'round')} className="trip_button">
                <IonRow>
                    <IonCol size="4" className="trip_button_icon">
                      <svg viewBox="0 0 967.39 864.4"><path d="M949.69 284.2l-100.3-149.43a103.55 103.55 0 0 0-86.05-45.91H549.9V12.93A12.88 12.88 0 0 0 537.02.05H425.07a12.88 12.88 0 0 0-12.88 12.88v75.93H229.3a12.89 12.89 0 1 0 0 25.77h534.06a77.82 77.82 0 0 1 64.68 34.48l100.3 149.44c17.71 26.227 17.71 60.583 0 86.81L828.04 534.8a77.76 77.76 0 0 1-64.68 34.48H203.53c-42.94 0-92.41-31.12-92.41-74.06l-11.25-3.83V192.47l10.19-8.85c0-34.39 38.58-56.26 71.54-65.91 6.695-2.103 10.478-9.177 8.509-15.913s-8.965-10.66-15.739-8.827c-44.069 13.094-74.343 53.528-74.5 99.5v298.87c.066 57.211 46.419 103.577 103.63 103.66h208.69v256.52a12.88 12.88 0 0 0 12.88 12.88h111.92a12.88 12.88 0 0 0 12.88-12.88v-52.93c-.194-6.976-5.906-12.531-12.885-12.531s-12.691 5.555-12.885 12.531v39.95h-86.15V595h86.15v152.06c.194 6.976 5.906 12.531 12.885 12.531s12.691-5.555 12.885-12.531V595h213.44a103.5 103.5 0 0 0 86.09-45.74l100.29-149.43c23.581-34.907 23.581-80.643 0-115.55zM437.94 25.81h86.15v63h-86.15zm259.63 289.83c6.976-.194 12.531-5.906 12.531-12.885s-5.555-12.691-12.531-12.885H402.9a12.89 12.89 0 1 0 0 25.77zm-449.3 0h103a12.89 12.89 0 1 0 0-25.77h-103c-6.976.194-12.531 5.906-12.531 12.885s5.555 12.691 12.531 12.885zm0 78.33h449.17c6.976-.194 12.531-5.906 12.531-12.885s-5.555-12.691-12.531-12.885H248.27c-6.976.194-12.531 5.906-12.531 12.885s5.555 12.691 12.531 12.885z"/><path d="M17.69 284.2l100.3-149.43a103.49 103.49 0 0 1 86.05-45.91h213.45V12.93A12.88 12.88 0 0 1 430.37.05h111.92a12.88 12.88 0 0 1 12.88 12.88v75.93h182.89a12.89 12.89 0 0 1 11.462 19.433 12.89 12.89 0 0 1-11.462 6.337h-534a77.76 77.76 0 0 0-64.64 34.48L39.09 298.5c-17.719 26.224-17.719 60.586 0 86.81l100.3 149.44a77.74 77.74 0 0 0 64.64 34.48h559.82c42.94 0 93.8-26.63 93.8-69.54l10-12.85V192.47c0-34.38-48.77-65.14-81.76-74.76-6.695-2.103-10.478-9.177-8.509-15.913s8.965-10.66 15.739-8.827c44.08 13.083 74.369 53.519 74.53 99.5v298.87c-.055 57.215-46.415 103.588-103.63 103.66H555.16v256.52a12.88 12.88 0 0 1-12.88 12.88H430.36a12.88 12.88 0 0 1-12.88-12.88v-52.93c0-7.113 5.767-12.88 12.88-12.88s12.88 5.767 12.88 12.88v39.95h86.06V595h-86.06v152.06c0 7.113-5.767 12.88-12.88 12.88s-12.88-5.767-12.88-12.88V595H204.03a103.5 103.5 0 0 1-86.05-45.74L17.69 399.66c-23.58-34.904-23.58-80.636 0-115.54zM529.31 25.81h-86.06v63h86.06z"/></svg>
                    </IonCol>
                    <IonCol size="8" className="trip_button_text">
                      Round Trip
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