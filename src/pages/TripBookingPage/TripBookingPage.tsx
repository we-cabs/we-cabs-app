import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons } from '@ionic/react'
import { IonButton,IonCol,IonRow } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import './TripBookingPage.css';
import VideoAndLogoFooter from '../../components/Footers/VideoAndLogoFooter';
interface TripBookingPageProps extends RouteComponentProps<{
  type: string;
}> {}

const TripBookingPage: React.FC<TripBookingPageProps> = ({match, history}) => {
  const hrederTitle = () =>{
    if(match.params.type == 'oneway'){
       return 'One Way Booking';
    }else{
      return 'Round Trip Booking';
    }
  }
  const openBookingDetailPage = (e:any,type:string) =>{
    e.preventDefault();
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
              <button onClick={(e) => openBookingDetailPage(e,match.params.type)} className="trip_button">
                <IonRow>
                    <IonCol size="12" className="trip_booking_button_text">
                      Check Out Available Bookings
                    </IonCol>
                </IonRow>
              </button>
            </IonCol>
          </IonRow>
          <IonRow>     
            <IonCol>
              <button onClick={(e) => openBookingDetailPage(e,match.params.type)} className="trip_button">
                <IonRow>
                    <IonCol size="12" className="trip_booking_button_text">
                    Enter Details To Get Bookings
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