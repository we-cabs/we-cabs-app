import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons } from '@ionic/react'
import { IonButton,IonCol,IonRow } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import SubPageHeaderComponent from '../../components/Header/SubPageHeaderComponent';
import './TripBookingPage.css';
interface TripBookingPageProps extends RouteComponentProps<{
  type: string;
}> {}

const TripBookingPage: React.FC<TripBookingPageProps> = ({match, history}) => {

  const openBookingDetailPage = (e:any,type:string) =>{
    e.preventDefault();
    history.push(`/dashboard/bookingdetail/${type}`);
  }
  return (
    <IonPage>
      <SubPageHeaderComponent/>
      <div className="container">
      <IonRow>
         <IonCol>
            <IonButton onClick={(e) => openBookingDetailPage(e,match.params.type)} className="trip_booking_button">Check Out Avaliable Bookings</IonButton>
          </IonCol>
        </IonRow>
        <IonRow>     
          <IonCol>
            <IonButton onClick={(e) => openBookingDetailPage(e,match.params.type)} className="trip_booking_button">Enter Details To Get Bookings</IonButton>
          </IonCol>
        </IonRow>
      </div>
    </IonPage>
  );
};

export default TripBookingPage;