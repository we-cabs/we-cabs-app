import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons } from '@ionic/react'
import { IonButton,IonCol,IonRow } from '@ionic/react';
import { useDispatch,useSelector,RootStateOrAny} from 'react-redux';
import { RouteComponentProps } from 'react-router';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import './TripBookingPage.css';
import VideoAndLogoFooter from '../../components/Footers/VideoAndLogoFooter';
import { actionToGetBookingData } from '../../actions/BookingAction';


const TripBookingPage: React.FC<RouteComponentProps> = ({match, history}) => {
  const dispatch = useDispatch();
  const hrederTitle = () =>{
    return 'We Cab Bus';
  }
  const openBookingDetailPage = (e:any,type:string) =>{
    e.preventDefault();
    dispatch(actionToGetBookingData(0));
    history.push(`/tabs/dashboard/bookingdetail/${type}`);
  }
  return (
    <IonPage>
      <SubPageHeaderComponent title={hrederTitle()}/>
      <IonContent>
        <div className="inner_contant_container">
        <div className="extra_red_section_div"></div>
        <div className="trip_button_container">
          <IonRow>
            <IonCol>
              <button className="trip_button">
                <IonRow>
                    <IonCol size="12" className="trip_booking_button_text">
                      Available Bookings
                    </IonCol>
                </IonRow>
              </button>
            </IonCol>
          </IonRow>
          <IonRow>     
            <IonCol>
              <button onClick={(e) => history.push('/tabs/dashboard/enter-to-get-booking')} className="trip_button">
                <IonRow>
                    <IonCol size="12" className="trip_booking_button_text">
                    Request Bookings
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

export default TripBookingPage;